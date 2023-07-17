const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const hashPassword = async(password) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}


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

userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await hashPassword(user.password);

  next();
});


  
const UserModel = mongoose.model("users", userSchema)
module.exports = UserModel