// controllers/patientController.js
const Patient = require('../models/patientModel');

// GET /patients
exports.getAllPatients = async (req, res) => {
  const doctorId = req.user._id;
  const patients = await Patient.find({ doctorId });
  res.json(patients);
};

// GET /patients/:id
exports.getPatientById = async (req, res) => {
  const doctorId = req.user._id;
  const patient = await Patient.findOne({ _id: req.params.id, doctorId });
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
};

// POST /patients (optional)
exports.addPatient = async (req, res) => {
  const doctorId = req.user._id;
  const newPatient = new Patient({ ...req.body, doctorId });
  await newPatient.save();
  res.status(201).json({ message: 'Patient added', patient: newPatient });
};
