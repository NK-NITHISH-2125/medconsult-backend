// controllers/dashboardController.js
const Availability = require('../models/availabilityModel');
const CalendarNote = require('../models/calendarNoteModel');

exports.getAvailability = async (req, res) => {
  const doctorId = req.user._id;
  const availability = await Availability.findOne({ doctorId });
  res.json(availability || {});
};

exports.setAvailability = async (req, res) => {
  const doctorId = req.user._id;
  const data = req.body;

  const updated = await Availability.findOneAndUpdate(
    { doctorId },
    data,
    { new: true, upsert: true }
  );

  res.json({ message: "Availability saved", updated });
};

exports.getCalendarNotes = async (req, res) => {
  const doctorId = req.user._id;
  const notes = await CalendarNote.find({ doctorId });
  res.json(notes);
};

exports.saveCalendarNote = async (req, res) => {
  const { date, note } = req.body;
  const doctorId = req.user._id;

  const saved = await CalendarNote.findOneAndUpdate(
    { doctorId, date },
    { note },
    { new: true, upsert: true }
  );

  res.json({ message: "Note saved", saved });
};
