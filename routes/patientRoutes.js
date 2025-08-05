// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// All patients for doctor
router.get('/', patientController.getAllPatients);

// Single patient detail
router.get('/:id', patientController.getPatientById);

// Add new patient (optional)
router.post('/', patientController.addPatient);

module.exports = router;
