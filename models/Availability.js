const mongoose = require('mongoose');
const AvailabilitySchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  days: [String],
  timeSlots: [String]
});
module.exports = mongoose.model('Availability', AvailabilitySchema);
