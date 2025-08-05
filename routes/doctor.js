// PUT /doctor/change-password
router.put('/change-password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const doctor = await Doctor.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(newPassword, salt);
    await doctor.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Password update failed" });
  }
});

// PUT /doctor/profile
router.put('/profile', verifyToken, async (req, res) => {
  const updates = req.body;

  try {
    const doctor = await Doctor.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Profile update failed" });
  }
});

router.get('/me', verifyToken, async (req, res) => {
  const doctor = await Doctor.findById(req.user.id);
  res.json(doctor);
});
