const express = require("express");
const CookieParser = require("cookie-parser");

const app = express();

app.use(express.json());



app.use(CookieParser());

const authRouter = require("../src/routes/auth.routes");

app.use("/api/auth", authRouter);

const postRouter = require("../src/routes/post.route")

app.use("/api/posts",postRouter)


module.exports = app;
