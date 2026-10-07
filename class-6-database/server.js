//only use for devolopement


require("node:dns/promises").setServers(["1.1.1.1","8.8.8.8"]);


const { log } = require("node:console");
const app = require("./src/app")


const mongoose = require("mongoose");

function connectToDb(){
   mongoose.connect("mongodb+srv://mhasalabhishek_db_user:xxuCaOWuQec9AC2k@cluster0.9oqk1n4.mongodb.net/class-7")
   .then(()=>{
    console.log(" connect to Database");
   });
}

connectToDb();




app.listen(3000,()=>{
  console.log(" server is running on port 3000");
  
})