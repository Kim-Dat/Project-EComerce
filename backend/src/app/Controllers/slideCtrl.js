const validateMongodbId = require("../../utils/validateMongodbId");
const slideModel = require("../models/slideModel");
class SlideController {
    async createSlide(req, res) {
        const image = req.file;
        try {
            const slide = await slideModel.create({ name: req.body.name, images: image?.path });
            res.json(slide);
        } catch (error) {
            if (image) cloudinary.uploader.destroy(image.filename);
            throw new Error(error);
        }
    }
    async getSlides(req, res) {
        try {
            const slides = await slideModel.find();
            res.json(slides);
        } catch (error) {}
    }
    async deleteSlide(req, res) {
        const { id } = req.params;
        validateMongodbId(id);
        try {
            const deleteSlide = await slideModel.findByIdAndDelete(id);
            res.json(deleteSlide);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new SlideController();
