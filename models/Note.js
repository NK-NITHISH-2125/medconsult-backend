const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {
    type: String, // e.g., '2025-08-03'
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

NoteSchema.index({ doctorId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Note', NoteSchema);
