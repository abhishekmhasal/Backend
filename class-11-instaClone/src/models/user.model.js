const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, " username alreaddy exist"],
    required: [true, " email is required"],
  },

  email: {
    type: String,
    unique: [true, " this email already exist"],
    required: [true, " email is required"],
  },

  password: {
    type: String,
    required: [true, " password is required"],
  },

  bio: String,

  ProfileImage:{
    type: String,
    default:"https://ik.imagekit.io/jtxbarti5x/Default_pfp.jpg?updatedAt=1792227194163"

  }
});

const userModel = mongoose.model("user",userSchema)
module.exports = userModel