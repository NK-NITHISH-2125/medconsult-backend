require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Register routes
app.use('/auth', require('./routes/auth'));
app.use('/doctor', require('./routes/doctor'));
app.use('/appointments', require('./routes/appointments'));
app.use('/patients', require('./routes/patients'));
app.use('/prescriptions', require('./routes/prescriptions'));
app.use('/notes', require('./routes/notes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
