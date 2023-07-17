const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const UserModel = require("./models/users");
const { default: isEmail } = require("validator/lib/isEmail");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Database connected"))
.catch((err) => console.log("Database not connected", err))

const handleErrors = (err) => {
  console.log(err.message, err.code);

  let errors = {name: "", email: "", password: ""};

  if(err.code === 11000){
    errors.email = "Email is already registered";
    return errors;
  }

  if(err.message.includes("users validation failed")){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

app.get("/users", (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving users");
    });
});

app.get("/user-details", (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;

    UserModel.findOne({"email": email})
      .then((user) => {
        res.json(user.name);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving users");
      });
  } catch(error) {
    console.log(error);
    res.status(400).json({"msg": "Invalid token"});
  }

});

app.post("/signup", async (req, res) => {
  const user = req.body;
  try {
    const newUser = new UserModel(user);
    await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json(error);
  }
});


app.post("/login", async(req,res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if(!isEmail(email)){
    return res.status(400).json({ msg: 'Please enter a valid email' });
  }else{
    try {
      let user = await UserModel.findOne({ "email": email });

      if (!user) {
        return res.status(400).json({ msg: 'Email or password incorrect' });
      }

      // Compare hash of password with password in db
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Email or password incorrect" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET
      )

      res.status(200).json({ msg: "Login successful", user: token });
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
})

app.listen(3125, () => {
    console.log("Up and running on port 3125")
})