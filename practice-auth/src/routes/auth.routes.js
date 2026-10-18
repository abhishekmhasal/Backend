const express = require("express");
const authRouter = express.Router();
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlredyExist = await userModel.findOne({ email });
  if (isUserAlredyExist) {
    res.status(400).json({
      meassage: " with this email user already register ",
    });
  }
  const user = await userModel.create({
    name,
    email,
    password,
  });
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_KEY,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    meassage: " user create sucessfully",
    user,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.Cookies);
  res.status(200).json({
    meassage: " toekn protected",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).json({
      meassage: " with this email user not found",
    });
  }

  const isPasswordMatched = user.password === password;
  if (!isPasswordMatched) {
    res.status(400).json({
      meassage: "Invalid Password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_KEY,
  );
  res.cookie("jwt_token", token);

  res.status(200).json({
    meassage: " user logged in sucessfully",
    user,
  });
});

module.exports = authRouter;
