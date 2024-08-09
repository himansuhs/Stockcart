const productModel = require("../models/productModel");

const getProduct = async (req, res) => {
  try {
    const allproducts = await productModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      data: allproducts,
      success: true,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, error: true, success: false });
  }
};
module.exports = getProduct;
