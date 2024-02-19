const validateMongodbId = require("../../utils/validateMongodbId");
const bannerModel = require("../models/bannerModel");
class BannerController {
    async createBanner(req, res) {
        const image = req.file;
        try {
            const slide = await bannerModel.create({ name: req.body.name, images: image?.path });
            res.json(slide);
        } catch (error) {
            if (image) cloudinary.uploader.destroy(image.filename);
            throw new Error(error);
        }
    }
    async getBanners(req, res) {
        try {
            const banners = await bannerModel.find();
            res.json(banners);
        } catch (error) {}
    }
    async deleteBanner(req, res) {
        const { id } = req.params;
        try {
            const deleteBanner = await bannerModel.findByIdAndDelete(id);
            res.json(deleteBanner);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new BannerController();
