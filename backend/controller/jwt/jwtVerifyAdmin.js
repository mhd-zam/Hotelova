const jwt = require("jsonwebtoken");
const admin = require("../../model/adminCollection");
require("dotenv").config();

const verifyJWTAdmin = async (req, res, next) => {
  const auth = req.headers['authorization']
  console.log(auth)

  if (!auth) {
    return res.sendStatus(401);
  }
  const token = auth;
  let result = await admin.findOne({ accessToken: token });
  if (!result) {
    return res.sendStatus(401);
  }
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_ADMIN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = decoded.username;
    next();
  });
};

module.exports = { verifyJWTAdmin };
