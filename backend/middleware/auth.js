const jwt = require("jsonwebtoken");
async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.json({
        message: "user not login",
        success: false,
        error: true,
      });
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      console.log(err);
      console.log(decoded);
      if (err) {
        console.log("error auth", err);
      }
      req.userId = decoded?._id;

      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
      data: [],
    });
  }
}
module.exports = authToken;
