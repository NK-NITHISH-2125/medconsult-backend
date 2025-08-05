// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Availability
router.get('/availability', dashboardController.getAvailability);
router.post('/availability', dashboardController.setAvailability);

// Calendar Notes
router.get('/notes', dashboardController.getCalendarNotes);
router.post('/notes', dashboardController.saveCalendarNote);

module.exports = router;
