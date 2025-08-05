// routes/prescriptionRoutes.js
const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');

router.get('/', prescriptionController.getPrescriptions);
router.post('/', prescriptionController.uploadPrescription);

module.exports = router;
