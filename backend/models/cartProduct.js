const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productId: {
      ref: "Product",
      type: String,
    },
    quantity: Number,
    UserId: String,
  },
  {
    timestamps: true,
  }
);
const cartModel = mongoose.model("addtocart", productSchema);

module.exports = cartModel;
