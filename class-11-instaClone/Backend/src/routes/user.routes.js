
const express = require("express")
const identifire = require("../middleware/auth.middle")
const userRouter = express.Router()
const userController =require("../controller/user.controller")


// post api for follow user ("api/users/follow/:username")
userRouter.post("/follow/:username",identifire,userController.followUserController)
//unfollow user 
//api/users.unfollow/:username
userRouter.post("/unfollow/:username",identifire,userController.unfollowUserController)


module.exports = userRouter;