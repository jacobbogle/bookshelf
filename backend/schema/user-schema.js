const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  google_id: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  followers: {
    type: {},
    default: {},
  },

  following: {
    type: {},
    default: {},
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
