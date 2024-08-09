const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    ProductImage: [],
    description: String,
    price: Number,
    selling: Number,
  },
  {
    timestamps: true,
  }
);
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
