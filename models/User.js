const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Add bcrypt for hashing passwords

// Add a method to compare passwords
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,  // Ensure the username is unique
    index: true
  },
  password: {
    type: String,
    required: true
  },
  phone: String,
  address: String,
  country: String
});

// Add the method to compare passwords before defining the model
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Hash the password before saving it
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Now define the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
