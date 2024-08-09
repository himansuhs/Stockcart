const express = require("express");
const router = express.Router();
const userSignup = require("../controller/userSignup.js");
const login = require("../controller/userSignin.js");
const authToken = require("../middleware/auth.js");
const userDetail = require("../controller/userDetail.js");
const userLogout = require("../controller/userLogout.js");
const allUser = require("../controller/allUser.js");
const updateUser = require("../controller/updateUser.js");
const uploadProduct = require("../controller/uploadProduct.js");
const getProduct = require("../controller/getProduct.js");
const editProduct = require("../controller/editProduct.js");
const getCategoryProduct = require("../controller/getCategoryProduct.js");
const getCategoryWiseProduct = require("../controller/getCategoryWiseProduct.js");
const getProductDetails = require("../controller/getProductDetails.js");
const addTocartController = require("../controller/addTocartController.js");
const countAddToCart = require("../controller/countAddToCart.js");
const addTocartViewProduct = require("../controller/addToCartView.js");
const updateAddToCartProduct = require("../controller/updateAddToCart.js");
const deleteAddToCartProduct = require("../controller/deleteAddToCart.js");
const searchProduct = require("../controller/searchProduct.js");
const filterProductController = require("../controller/filterProduct.js");
router.post("/signup", userSignup);
router.post("/login", login);
router.get("/user-details", authToken, userDetail);
router.get("/user-logout", userLogout);
// admin panel

router.get("/all-users", authToken, allUser);

router.post("/update-user", authToken, updateUser);

//upload product

router.post("/upload-product", authToken, uploadProduct);

// getall products
router.get("/get-products", getProduct);

//edit product
router.post("/edit-product", authToken, editProduct);

//get category products
router.get("/get-category", getCategoryProduct);

// category productswise
router.post("/category-product", getCategoryWiseProduct);
//product details
router.post("/product-details", getProductDetails);

//user add to cart
router.post("/addto-cart", authToken, addTocartController);
//count add to cart
router.get("/count-addToCart", authToken, countAddToCart);
//view cart
router.get("/view-cart", authToken, addTocartViewProduct);

router.post("/update-cart", authToken, updateAddToCartProduct);
router.post("/delete-cart", authToken, deleteAddToCartProduct);
router.get("/search", searchProduct);
router.post("/filter", filterProductController);
module.exports = router;
