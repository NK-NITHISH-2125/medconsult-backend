const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKeyHere'; // Use .env in prod

// 🆕 Doctor Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const newDoctor = new Doctor({ name, email, password });
    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// 🔐 Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: doctor._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Simulate email sending (in production, integrate with email provider)
    res.json({ message: "Reset token generated", token });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await Doctor.findById(decoded.id);
    if (!doctor) return res.status(404).json({ error: "Invalid token" });

    doctor.password = newPassword; // Ensure password hash is handled in pre-save middleware
    await doctor.save();

    res.json({ message: "Password successfully reset" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});
