const userModel = require("../models/userModels");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, email, name, role } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };
    const user = await userModel.findById(sessionUser);
    console.log("user role", user.role);

    const updateUser = await userModel.findByIdAndUpdate(userId, payload);

    res.status(200).json({
      data: updateUser,
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
}
module.exports = updateUser;
