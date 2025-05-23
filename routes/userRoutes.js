const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model
const { authenticateUser } = require('../controllers/authController');

// Signup route
router.post('/signup', async (req, res) => {
  const { email, password, name, phone, address, country } = req.body;

  if (!email || !password || !name || !country) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Generate username from name, e.g., use lowercase of the name as username
  const username = name.toLowerCase().replace(/ /g, '');

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Signup failed. Try another email.' });
    }

    const newUser = new User({
      email,
      password,
      name,
      phone,
      address,
      country,
      username // Use generated username
    });

    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Server error', error: err.message || err });
  }
});
// Login route
router.post('/login', authenticateUser);
module.exports = router;

// router.post('/login', async (req, res) => {
//   console.log("Received login request:", email, password);

//   const { email, password } = req.body;
//   console.log("Login attempt:", email, password); // Debug line

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       console.log("No user found with email:", email); // Debug line
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     if (user.password !== password) {
//       console.log("Password mismatch:", password, user.password); // Debug line
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ message: 'Server error', error: err.message || err });
//   }
// });


// module.exports = router; // Make sure this line is at the bottom
