// controllers/prescriptionController.js
const Prescription = require('../models/prescriptionModel');

exports.getPrescriptions = async (req, res) => {
  const doctorId = req.user._id;
  const prescriptions = await Prescription.find({ doctorId }).sort({ createdAt: -1 }).limit(10);
  res.json(prescriptions);
};

exports.uploadPrescription = async (req, res) => {
  const doctorId = req.user._id;
  const { patientName, notes } = req.body;

  if (!patientName || !notes) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const prescription = new Prescription({ doctorId, patientName, notes });
  await prescription.save();
  res.status(201).json({ message: "Prescription uploaded", prescription });
};
