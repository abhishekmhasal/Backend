const express = require("express");

const userModel = require("../model/user.model");

const jwt = require("jsonwebtoken"); // token create karene ke liye

const authRouter = express.Router();

//auth chalu krne ke liye
// api hit /api/auth prifix

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUseralreadyExist = await userModel.findOne({ email }); //pahile se koi same email database me hogo to ya se hi return kr degi
  if (isUseralreadyExist) {
    return res.status(400).json({
      meaassage: " with this email user already exist",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    //token create hoga aur usme kya kya jayegaa vo sb diya hai
    {
      id: user._id,
      name: user.name, // secreate key lani hao
      email: user.email,
    },

    process.env.JWt_KEY, // .env se screte key lane ke liye
  );
  res.cookie("jwt-token", token); // token cookies ke andar save hoga

  res.status(201).json({
    meassage: " user create sucessfully",
    user,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);

  res.status(200).json({
    meassage: " user protrcted",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      meassage: " user not found this email address",
    });
  }
  const isPasswordMatched = user.password === password;
  if (!isPasswordMatched) {
    return res.status(400).json({
      meassage: " Invalid PASSWORD",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWt_KEY,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    meassage: " user logged in sucessfully",
    user,
  });
});

module.exports = authRouter;
