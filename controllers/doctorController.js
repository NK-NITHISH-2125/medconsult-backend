// controllers/doctorController.js
const Doctor = require('../models/doctorModel');

// GET /doctor/profile
exports.getProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id).select('-password');
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor profile' });
  }
};

// PUT /doctor/profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const doctor = await Doctor.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ message: 'Profile updated', doctor });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// controllers/doctorController.js

// GET /doctor/settings
exports.getSettings = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user._id).select('-password');
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load settings' });
  }
};

// PUT /doctor/settings
exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    const doctor = await Doctor.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json({ message: 'Settings saved', doctor });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save settings' });
  }
};
