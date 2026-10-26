const jwt = require("jsonwebtoken")

async function identifire( req ,res, next){

  const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        meassage: " token not provided unauthried access",
      });
    }
    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SCREATE); // register kaa data ayega
    } catch {
      return res.status(401).json({
        meassage: " user not authorized",
      });
}
}
module.exports = identifire