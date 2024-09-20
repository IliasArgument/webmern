const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    // required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3, // Enforce a minimum password length for security
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
