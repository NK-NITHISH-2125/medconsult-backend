// models/calendarNoteModel.js
const mongoose = require('mongoose');

const calendarNoteSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  note: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CalendarNote', calendarNoteSchema);
