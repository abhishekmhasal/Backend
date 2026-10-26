const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt =require("bcryptjs")

async function registerController(req, res) {
  const { username, email, password, bio, ProfileImage } = req.body;
  const userAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (userAlreadyExist) {
    return res.status(404).json({
      meassage:
        " user already Exist" +
        (userAlreadyExist.email === email ? "with username" : " with Email"),
    });
  }
  const hash = await  bcrypt.hash(password,10)
  
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    ProfileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCREATE,
  );

  res.cookie("token", token);

  res.status(201).json({
    meassage: " user regiser sucessfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      ProfileImag: user.ProfileImage,
    },
    token,
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      { username: username },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    return res.status(409).json({
      meassage: " user not found",
    });
  }
 const isPasswordExist = await bcrypt.compare(password,user.password)

  if(!isPasswordExist){
    return res.status(409).json({
      meassage:"invalid password"
    })
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
  meassage:"user logged in sucessfully",
  user:{
 id :user.id,
 email:user.email,
 username:user.username,
 bio:user.bio,
 ProfileImage:user.ProfileImage
  },
  
})
}
module.exports = { registerController ,loginController};
