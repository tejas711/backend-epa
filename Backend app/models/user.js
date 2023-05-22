const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    contact: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      required: true,
    },
    selected: {
      type: [String],
      required: true,
      default: []
    },
    isUser: {
      type: Boolean,
      required: true,
      default: true
    },
    profilePic: {
      type: String,
      default: null,
    }
  },
  { timestamp: true }
);
const User = mongoose.model("users", userSchema);
module.exports = User;