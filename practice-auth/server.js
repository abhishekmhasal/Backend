
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);const app = require("./src/app");
const connectToDB = require("./src/config/database");
require("dotenv").config();

connectToDB();
app.listen(3000, () => {
  console.log(" server is running on port 3000");
});
