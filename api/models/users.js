const mongoose = require("mongoose");
const { isEmail } = require("validator");

// Create the UserModel
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter an password"],
      minlength: [8, "Password must be at least 8 characters long"]
    },
});
  
const UserModel = mongoose.model("users", userSchema)
module.exports = UserModel