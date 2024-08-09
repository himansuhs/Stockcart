const userModel = require("../models/userModels");

async function userDetail(req, res) {
  try {
    // console.log("userid", req.userId);
    const user = await userModel.findById(req.userId);
    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: "User details fetched successfully",
    });
    console.log(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
}
module.exports = userDetail;
