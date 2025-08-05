// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// GET doctor's profile
router.get('/profile', doctorController.getProfile);

// PUT update profile (used in settings.html)
router.put('/profile', doctorController.updateProfile);
// GET doctor's settings
router.get('/settings', doctorController.getSettings);
// PUT update settings (used in settings.html)
router.put('/settings', doctorController.updateSettings);


module.exports = router;
