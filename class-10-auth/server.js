require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const app = require("./src/app");

require("dotenv").config();

const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000, () => {
  console.log("server is runing on port 3000");
});
// use pakcge 
// 1} mongoose //require  in database file and model file
//2} dotenv  //require in server file 
//3] jsonwebtoken // require in  auth file for create token
//4} cokkie-parser // require in app file use like middle ware // app.use(express.json()) this is also middle ware for req data padhne ke liye
//4} 
