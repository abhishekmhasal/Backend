const express = require("express")
const postRouter = express.Router()
const postController =require("../controller/post.controller")
const multer =require("multer")
const upload = multer({storage:multer.memoryStorage()})  
const identifire = require("../middleware/auth.middle")

//client side se data ya file server pr lane ke liye hm multer ka use kerte hai 
// hamara server file ko padh nhi skata usko file ka dtata smaj ane ke liye hm multer pakge ka use karte hai

postRouter.post("/",upload.single("image"),identifire ,postController.postCreate)

postRouter.get("/" ,identifire ,postController.getPostController)
// get api/posts/details/:postId
// returm an detils about specific post with id alslo chekc whethe the post belongs to the user that the request come from 
postRouter.get("/details/:postId" ,identifire ,postController.getPostDeatailController)

module.exports = postRouter
