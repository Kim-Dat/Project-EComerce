const express = require("express");
const asyncHandler = require("express-async-handler");
const fileUploader = require("../app/middlewares/uploadImages");
const router = express.Router();
const slideController = require("../app/Controllers/slideCtrl");

const { authMiddleware, isAdmin } = require("../app/middlewares/authMiddleware");
router.post("/", fileUploader.single("images"), asyncHandler(slideController.createSlide));
router.get("/", asyncHandler(slideController.getSlides));
router.delete("/:id", asyncHandler(slideController.deleteSlide));
module.exports = router;
