const uploadProductPermission = require("../helper/permission");
const productModel = require("../models/productModel");

async function editProduct(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized", error: true, success: false });
    }
    const { _id, ...rest } = req.body;
    const updateProduct = await productModel.findByIdAndUpdate(_id, rest);
    res.json({
      message: "Product updated successfully",
      data: updateProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, error: true, success: false });
  }
}
module.exports = editProduct;
