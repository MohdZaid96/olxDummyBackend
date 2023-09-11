const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");

const usrRoute = express.Router();

usrRoute.post("/signup", (req, res) => {
  const { name, email, password,location } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) { 
    if (err) {
      res.send({ message: "Error" });
    } else {
      const new_user = new UserModel({
        name,
        email,
        password: hash,
        location
      });
      await new_user.save();
      res.send({ message: "SignUp Successfull" });
    }
  });
});

usrRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (user) {
    const hashed_password = user.password;
    bcrypt.compare(password, hashed_password, function (err, result) {
      if (result) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

        res.send({ message: "Login Successfull", token: token });
      } else {
        res.send({ message: "Please SignUp" });
      }
    });
  } else {
    res.send({ message: "Error" });
  }
});
module.exports = { usrRoute };
