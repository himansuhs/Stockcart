const cartModel = require("../models/cartProduct");

const addTocartViewProduct = async (req, res) => {
  try {
    const currentUser = req.UserId;
    const allProducts = await cartModel
      .find({
        UserId: currentUser,
      })
      .populate("productId");
    res.json({
      data: allProducts,
      success: true,
      message: "All products fetched from cart successfully",
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
module.exports = addTocartViewProduct;
