const express = require("express");
const app = express();
app.use(express.json())
const CookieParser = require("cookie-parser")
app.use(CookieParser())


const authRouter =require("../src/routes/auth.routes")

app.use("/api/auth",authRouter)
module.exports = app;
