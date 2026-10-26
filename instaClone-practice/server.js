require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config()
const app = require("./src/app");

const connectToDb = require("./src/config/database");
const cookieParser = require("cookie-parser");


connectToDb()
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
