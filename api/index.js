const express = require("express")
const app = express()

app.use(express.json())

require("dotenv").config()

const mongoose = require("mongoose")
const UserModel = require("./models/users");

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Database connected"))
.catch((err) => console.log("Database not connected", err))


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
  const user = req.body
  const newUser = new UserModel(user)

  await newUser.save()

  res.json(user)
})

app.listen(3125, () => {
    console.log("Up and running on port 3125")
})