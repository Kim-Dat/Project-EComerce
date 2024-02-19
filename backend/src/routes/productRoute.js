const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const productController = require("../app/Controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../app/middlewares/authMiddleware");
const fileUploader = require("../app/middlewares/uploadImages");
/* router */
router.get("/", asyncHandler(productController.getAllProduct));
router.get("/filter", asyncHandler(productController.getBodyProduct));
router.post("/create", authMiddleware, isAdmin, fileUploader.single("image"), asyncHandler(productController.createProductCtrl));
router.post("/searchProduct", asyncHandler(productController.searchProduct));
router.patch("/wishlist", authMiddleware, asyncHandler(productController.addToWishList));
router.put("/rating", authMiddleware, asyncHandler(productController.rating));
router.get("/:id", asyncHandler(productController.getAProduct));
router.put("/:id", authMiddleware, isAdmin, fileUploader.single("image"), asyncHandler(productController.updateProduct));
router.delete("/:id", authMiddleware, isAdmin, asyncHandler(productController.deleteProduct));

module.exports = router;
