const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username : {
    type: String,
    unique: [ true ," this user nmae already exist"],
    required: true
  },
  email:{
    type:String,
    unique:[true," this email already exist"],
    required: true,
  },

  password:{
    type:String,
    required: true,
  },
  bio : String,

  ProfileImage:{
    type:String,
    default:"https://ik.imagekit.io/jtxbarti5x/Default_pfp.jpg?updatedAt=1792227194163"
  }

})
const userModel = mongoose.model("user",userSchema)

module.exports = userModel

