// routes/availability.js
const express = require('express');
const router = express.Router();
const Availability = require('../models/Availability');
const verifyToken = require('../middleware/verifyToken');

// GET doctor availability
router.get('/', verifyToken, async (req, res) => {
  try {
    const availability = await Availability.findOne({ doctorId: req.user.id });
    res.json(availability || {});
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch availability" });
  }
});

// POST (create or update) availability
router.post('/', verifyToken, async (req, res) => {
  try {
    const { days, timeSlots } = req.body;

    let availability = await Availability.findOne({ doctorId: req.user.id });
    if (availability) {
      availability.days = days;
      availability.timeSlots = timeSlots;
      await availability.save();
    } else {
      availability = await Availability.create({
        doctorId: req.user.id,
        days,
        timeSlots,
      });
    }

    res.json({ success: true, data: availability });
  } catch (err) {
    res.status(500).json({ error: "Failed to save availability" });
  }
});

module.exports = router;
