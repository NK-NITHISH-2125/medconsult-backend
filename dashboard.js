// public/dashboard.js
const API_BASE = 'https://medconsult-api.onrender.com';

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

// Theme Toggle
const themeToggle = document.getElementById("themeToggleBtn");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
  body.classList.remove("dark");
  body.classList.add("light");
  if (themeToggle) themeToggle.textContent = "🌙";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    body.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });
}

// Loader
window.addEventListener("load", () => {
  document.getElementById("loader-overlay").style.opacity = 0;
  setTimeout(() => document.getElementById("loader-overlay").style.display = "none", 500);
  animateStats();
  renderCalendar(currentDate);
  loadAvailability();
});

// Animate Stats
function animateStats() {
  animateValue("stat-1", 0, 5, 1000);
  animateValue("stat-2", 0, 12, 1200);
  animateValue("stat-3", 0, 3, 800);
}

function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    obj.textContent = current;
    if (current === end) clearInterval(timer);
  }, stepTime);
}

// Calendar
const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
let currentDate = new Date();
let selectedDateKey = "";

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  monthYear.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });
  calendarDays.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  days.forEach(day => {
    const div = document.createElement("div");
    div.className = "calendar-day";
    div.textContent = day;
    calendarDays.appendChild(div);
  });

  for (let i = 0; i < firstDay; i++) {
    calendarDays.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= lastDate; d++) {
    const div = document.createElement("div");
    div.className = "calendar-date";
    div.textContent = d;
    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    div.dataset.date = formatted;

    const note = localStorage.getItem(`note-${formatted}`);
    if (note) {
      div.classList.add("has-note");
      div.setAttribute("data-note", note);
    }

    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      div.classList.add("today");
    }

    div.addEventListener("click", handleDateClick);
    calendarDays.appendChild(div);
  }
}

function changeMonth(direction) {
  currentDate.setMonth(currentDate.getMonth() + direction);
  renderCalendar(currentDate);
}

function handleDateClick(e) {
  const clickedDate = e.target.dataset.date;
  if (!clickedDate) return;
  selectedDateKey = `note-${clickedDate}`;
  document.getElementById("selectedDateLabel").textContent = clickedDate;
  document.getElementById("dateNote").value = localStorage.getItem(selectedDateKey) || "";
  document.getElementById("calendarModal").style.display = "flex";
}

function saveNote() {
  const note = document.getElementById("dateNote").value.trim();
  if (note) {
    localStorage.setItem(selectedDateKey, note);
    showToast("Note saved successfully!", "success");
  } else {
    localStorage.removeItem(selectedDateKey);
  }
  closeCalendarModal();
  renderCalendar(currentDate);
}

function closeCalendarModal() {
  document.getElementById("calendarModal").style.display = "none";
}

// Availability
function saveAvailability() {
  const days = Array.from(document.querySelectorAll('input[name="day"]:checked')).map(cb => cb.value);
  const availability = {
    days,
    morning: {
      start: document.getElementById("timeMorningStart").value,
      end: document.getElementById("timeMorningEnd").value
    },
    evening: {
      start: document.getElementById("timeEveningStart").value,
      end: document.getElementById("timeEveningEnd").value
    }
  };
  localStorage.setItem("doctorAvailability", JSON.stringify(availability));
  showToast("Availability saved!", "success");
}

function loadAvailability() {
  const saved = JSON.parse(localStorage.getItem("doctorAvailability"));
  if (!saved) return;
  saved.days.forEach(day => {
    const cb = document.querySelector(`input[name="day"][value="${day}"]`);
    if (cb) cb.checked = true;
  });
  document.getElementById("timeMorningStart").value = saved.morning.start;
  document.getElementById("timeMorningEnd").value = saved.morning.end;
  document.getElementById("timeEveningStart").value = saved.evening.start;
  document.getElementById("timeEveningEnd").value = saved.evening.end;
}

// Notifications
function toggleNotifications() {
  const panel = document.getElementById("notificationsPanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
  if (panel.style.display === "block") {
    showToast("You have new notifications 🔔");
  }
}

document.addEventListener("click", (e) => {
  const panel = document.getElementById("notificationsPanel");
  const icon = document.querySelector(".notification-icon");
  if (!panel.contains(e.target) && !icon.contains(e.target)) {
    panel.style.display = "none";
  }
});

// Logout
function openLogoutModal() {
  document.getElementById("logoutModal").style.display = "flex";
}
function closeLogoutModal() {
  document.getElementById("logoutModal").style.display = "none";
}
function confirmLogout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// Toast
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  if (type === "success") toast.style.background = "#16a34a";
  if (type === "error") toast.style.background = "#dc2626";
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}