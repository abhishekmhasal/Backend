const express = require("express");

const authRouter = require("./routes/auth.routes");

const cookieParser = require("cookie-parser") 


const app = express();

app.use(express.json());

app.use(cookieParser())//middlewarre

app.use("/api/auth", authRouter); //frontend me prifix use na karne pade to hm backend me hi use kr lete hai 

module.exports = app;
