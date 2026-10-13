
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config()
const connectToDb = require("./src/config/database")
const app= require("./src/app")

connectToDb()




app.listen(3000,()=>{
  console.log(" port is running on  3000");
  
})