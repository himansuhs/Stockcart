const userModel = require("../models/userModels");

async function allUser(req, res) {
  try {
    const allUsers = await userModel.find();

    if (allUsers.length === 0) {
      return res.status(404).json({
        message: "No users found",
        success: false,
      });
    }

    res.status(200).json({
      message: "All users fetched successfully",
      data: allUsers,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Failed to fetch users",
      error: true,
      success: false,
    });
  }
}

module.exports = allUser;
