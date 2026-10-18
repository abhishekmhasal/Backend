const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/auth.controller")

//  register api create krana hai

authRouter.post("/register",authController.registerController);

authRouter.post("/login",authController.loginController);

module.exports = authRouter;
