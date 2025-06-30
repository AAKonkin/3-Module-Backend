const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

function auth(req, res, next) {
  const token = req.cookies.token ?? null;

  try {
    const verifyResult = jwt.verify(token, JWT_SECRET);
    req.user = {
      email: verifyResult.email,
    };
    next();
  } catch (err) {
    next();
  }
}

module.exports = auth;
