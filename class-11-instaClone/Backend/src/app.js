const express = require("express");
const CookieParser = require("cookie-parser");
const cors  = require("cors")
const app = express();

app.use(express.json());
app.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}))
app.use(CookieParser());

//require routes
const authRouter = require("../src/routes/auth.routes");
const postRouter = require("../src/routes/post.route");
const userRouter = require("../src/routes/user.routes");


//using api
app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/users",userRouter);

module.exports = app;
