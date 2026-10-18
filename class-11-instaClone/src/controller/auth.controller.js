const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


//logic code pura jata hai controller file ke andar


  async function registerController(req, res){
  const { username, email, password, bio, ProfileImage } = req.body;

  const userAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExist) {
    return res.status(409).json({
      meassage:
        " user alredy exist " +
        (userAlreadyExist.email === email
          ? " email alredy exist"
          : "username already exist"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    bio,
    ProfileImage,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCREATE,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    meassage: " user register sucessfully",
    user: {
      email: user.email,
      usename: user.username,
      bio: user.bio,
      ProfileImage: user.ProfileImage,
    },
  });
}

async function loginController(req, res){
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or:[
        { 
        username: username
        },
        {
          email:email
        },
    ],
  });
  if (!user) {
    return res.status(409).json({
      meassage: " user not found",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isPassword = hash === user.password;
  if (!isPassword) {
    res.status(409).json({
      meassage: " Invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCREATE,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    meassage: " user logged in sucessfully",
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      bio: user._bio,
      ProfileImage: user.ProfileImage,
    },
  });
}

module.exports = {
  registerController,loginController
}