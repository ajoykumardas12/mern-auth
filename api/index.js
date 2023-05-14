const express = require("express")
const app = express()
const cors = require("cors")

require("dotenv").config()

const mongoose = require("mongoose")
const UserModel = require("./models/users")

app.use(express.json())
app.use(cors())

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

app.post("/signup", async(req,res) => {
  const user = req.body;
  console.log(user);

  try{
    const newUser = new UserModel(user);
    await newUser.save();
  
    res.status(200).json(user);
  }
  catch(err){
    const error = handleErrors(err);
    res.status(400).json(error)
  }

})

app.post("/login", async(req,res) => {
  const { email, password } = req.body;
  console.log(email, password);
})

app.listen(3125, () => {
    console.log("Up and running on port 3125")
})