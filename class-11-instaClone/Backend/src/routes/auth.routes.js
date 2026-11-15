const express = require("express");
const authRouter = express.Router();
const identifire = require("../middleware/auth.middle")
const authController = require("../controller/auth.controller");



//  register api create krana hai

authRouter.post("/register", authController.registerController);

authRouter.post("/login", authController.loginController);

authRouter.get("/get-me",identifire,authController.getController)

module.exports = authRouter;
