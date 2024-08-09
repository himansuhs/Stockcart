const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");

async function userSignin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("please provide email");
    }
    if (!password) {
      throw new Error("please provide password");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    } else {
      const tokendata = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("token", token, tokenOption).json({
        message: "User logged in successfully",
        success: true,
        data: token,
        error: false,
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignin;
