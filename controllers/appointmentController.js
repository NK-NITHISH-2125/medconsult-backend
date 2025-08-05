// controllers/appointmentController.js
const Appointment = require('../models/appointment');

// GET /appointments
exports.getAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id; // Assuming auth middleware sets req.user
    const appointments = await Appointment.find({ doctorId }).sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching appointments' });
  }
};

// POST /appointments/:id/accept
exports.acceptAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept appointment' });
  }
};

// POST /appointments/:id/reject
exports.rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject appointment' });
  }
};
