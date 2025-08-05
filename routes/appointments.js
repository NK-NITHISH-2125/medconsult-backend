// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Get all appointments for logged-in doctor
router.get('/', appointmentController.getAppointments);

// Accept appointment
router.post('/:id/accept', appointmentController.acceptAppointment);

// Reject appointment
router.post('/:id/reject', appointmentController.rejectAppointment);

module.exports = router;



router.get('/date/:date', verifyToken, async (req, res) => {
  const { date } = req.params;
  try {
    const appointments = await Appointment.find({ date });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments for date" });
  }
});

// Update appointment
router.put('/:id', verifyToken, async (req, res) => {
  const { time, concern } = req.body;
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, { time, concern }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// Cancel (delete) appointment
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});
