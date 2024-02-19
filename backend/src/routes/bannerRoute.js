const express = require("express");
const asyncHandler = require("express-async-handler");
const fileUploader = require("../app/middlewares/uploadImages");
const router = express.Router();
const bannerController = require("../app/Controllers/bannerCtrl");

const { authMiddleware, isAdmin } = require("../app/middlewares/authMiddleware");
router.post("/", fileUploader.single("images"), asyncHandler(bannerController.createBanner));
router.get("/", asyncHandler(bannerController.getBanners));
router.delete("/:id", asyncHandler(bannerController.deleteBanner));
module.exports = router;
