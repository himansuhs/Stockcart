const uploadProductPermission = require("../helper/permission");
const productModel = require("../models/productModel");

async function uploadProduct(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized", error: true, success: false });
    }
    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();
    res.status(201).json({
      message: "Product uploaded successfully",
      data: saveProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, error: true, success: false });
  }
}
module.exports = uploadProduct;
