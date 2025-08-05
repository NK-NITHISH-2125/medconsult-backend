const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // Adjust if model path differs
const verifyToken = require('../middleware/verifyToken'); // Auth middleware

// 📄 GET all patients (list)
router.get('/', verifyToken, async (req, res) => {
  try {
    const patients = await Patient.find({ doctorId: req.user.id });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching patients' });
  }
});

// 🔍 GET patient by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id, doctorId: req.user.id });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching patient' });
  }
});

// POST /patients - Create a new patient
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, age, gender, contact, condition, history } = req.body;
    const newPatient = new Patient({
      doctorId: req.user.id,
      name,
      age,
      gender,
      contact,
      condition,
      history
    });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ error: 'Error creating patient' });
  }
});

// PUT /patients/:id - Update patient details
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Patient.findOneAndUpdate(
      { _id: req.params.id, doctorId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Patient not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating patient' });
  }
});

// DELETE /patients/:id - Delete patient
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Patient.findOneAndDelete({
      _id: req.params.id,
      doctorId: req.user.id
    });
    if (!deleted) return res.status(404).json({ error: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting patient' });
  }
});


module.exports = router;
