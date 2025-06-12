const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import your user routes
const surveyRoutes = require('./routes/surveyRoutes');//import survey routes

app.get('/', (_req, res) => {
  res.sendStatus(200);
});

const app = express();

app.use(cors());
app.use(express.json());

// Mount the userRoutes for handling signup and login
app.use('/api/users', userRoutes); // This will now handle both /signup and /login
app.use('/api/survey', surveyRoutes); // mount the survey routes


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));
