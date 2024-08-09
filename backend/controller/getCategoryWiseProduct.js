const productModel = require("../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const product = await productModel.find({ category });
    // console.log(product);
    res.json({
      data: product,
      success: true,
      message: "Products fetched successfully by category",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

module.exports = getCategoryWiseProduct;
