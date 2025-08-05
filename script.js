const API_BASE = 'https://medconsult-api.onrender.com';

function authHeaders() {
  const token = localStorage.getItem('token');
  if (!token) {
    // Optionally redirect to login
    console.warn('No auth token found');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

// Theme toggle
const themeToggle = document.getElementById("toggle-theme");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
    themeToggle.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

function disableUnavailableDays(availableDays) {
  const allDates = document.querySelectorAll('.calendar-date');
  allDates.forEach(dateEl => {
    const day = dateEl.dataset.day;
    if (!availableDays.includes(day)) {
      dateEl.classList.add('unavailable');
      dateEl.style.pointerEvents = 'none';
      dateEl.style.opacity = 0.4;
    } else {
      dateEl.classList.remove('unavailable');
      dateEl.style.pointerEvents = 'auto';
      dateEl.style.opacity = 1;
    }
  });
}
