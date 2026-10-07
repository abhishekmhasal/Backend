//only use for devolopement

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const { log } = require("node:console");
const app = require("./src/app");

const mongoose = require("mongoose");

function connectToDb() {
  //mongoose connect 
    (() => {
      console.log(" connect to Database");
    });
}

connectToDb();

app.listen(3000, () => {
  console.log(" server is running on port 3000");
});
