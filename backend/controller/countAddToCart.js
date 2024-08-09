const cartModel = require("../models/cartProduct");

const countAddToCart = async (req, res) => {
  try {
    const userId = req.UserId;
    const count = await cartModel.countDocuments({
      UserId: userId,
    });
    res.json({
      data: {
        count: count,
      },
      success: true,
      message: "ok",
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
module.exports = countAddToCart;
