const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");

async function userSignup(req, res) {
  try {
    const { email, password, name } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }
    if (!email) {
      throw new Error("please provide email");
    }
    if (!name) {
      throw new Error("please provide name");
    }
    if (!password) {
      throw new Error("please provide password");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    if (!hashPassword) {
      throw new Error("password hashing failed");
    }
    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };
    const userData = new userModel(payload);
    const saveUser = await userData.save();
    res.status(200).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User registered successfully",
    });
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}
module.exports = userSignup;
