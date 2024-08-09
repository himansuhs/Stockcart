const cartModel = require("../models/cartProduct");

const addTocartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.UserId;
    const isProductAvailable = await cartModel.findOne({
      productId: productId,
    });
    console.log("product available", isProductAvailable);
    if (isProductAvailable) {
      return res.json({
        message: "Product already in cart",
        success: false,
        error: true,
      });
    }
    const payload = {
      productId: productId,
      quantity: 1,
      UserId: currentUser,
    };
    const newAddTocart = new cartModel(payload);
    const saveProduct = await newAddTocart.save();
    res.json({
      data: saveProduct,
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

module.exports = addTocartController;
