const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const verifyToken = require('../middleware/verifyToken');

// Get note for a date
router.get('/:date', verifyToken, async (req, res) => {
  try {
    const note = await Note.findOne({
      doctorId: req.user.id,
      date: req.params.date
    });
    res.json(note || { text: "" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch note" });
  }
});

// Save/update note
router.post('/', verifyToken, async (req, res) => {
  const { date, text } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { doctorId: req.user.id, date },
      { text },
      { upsert: true, new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to save note" });
  }
});

module.exports = router;
