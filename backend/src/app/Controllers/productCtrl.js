const validateMongodbId = require("../../utils/validateMongodbId");
const productModel = require("../models/productModel");
const slugify = require("slugify");
const userModel = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
class ProductController {
    /* [POST] api/product/*/
    async createProductCtrl(req, res) {
        const image = req.file;
        try {
            if (req.body.title) {
                req.body.slug = slugify(req.body.title, {
                    lower: true,
                    locale: "vi",
                    trim: true,
                });
            }
            const newProduct = await productModel.create({ ...req.body, image: image?.path });
            res.json({
                createProduct: newProduct,
            });
        } catch (error) {
            if (image) cloudinary.uploader.destroy(image.filename);
            throw new Error(error);
        }
    }
    /* [PUT] api/product/:id*/
    async updateProduct(req, res) {
        const image = req.file;
        const { id } = req.params;
        try {
            const product = await productModel.findById(id);
            const oldImage = product.image;
            const parts = oldImage.split("/");
            const filename = parts[parts.length - 1];
            const publicId = filename.split(".")[0];
            if (!publicId) {
                console.error("Không thể trích xuất public ID từ URL.");
                return;
            }
            // Gọi API để xóa ảnh
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error("Xóa ảnh không thành công:", error);
                } else {
                    console.log("Xóa ảnh thành công:", result);
                }
            });
            if (req.body.title) {
                req.body.slug = slugify(req.body.title);
            }
            const updateProduct = await productModel.findOneAndUpdate(
                { _id: req.params.id },
                { ...req.body, image: image?.path },
                {
                    new: true,
                }
            );
            res.json(updateProduct);
        } catch (error) {
            throw new Error(error);
        }
    }
    /* [DELETE] api/product/:id*/
    async deleteProduct(req, res) {
        try {
            const deleteProduct = await productModel.findByIdAndDelete({
                _id: req.params.id,
            });
            res.json(deleteProduct);
        } catch (error) {
            throw new Error(error);
        }
    }
    /* [GET] api/product/:id*/
    async getAProduct(req, res) {
        const { id } = req.params;
        validateMongodbId(id);
        try {
            const findProduct = await productModel.findById(id).populate("ratings.postedBy");
            res.json(findProduct);
        } catch (error) {
            throw new Error(error);
        }
    }
    async searchProduct(req, res) {
        const { keyword } = req.body;
        try {
            const product = await productModel.find({ title: { $regex: keyword, $options: "i" } });
            if (product.length === 0) {
                //không tìm thấy sản phẩm
                return res.status(404).json({ message: "Không tìm thấy sản phẩm nào phù hợp" });
            }
            // danh sách sản phẩm khi tìm thấy
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    /* [PUT] api/product/*/
    async getAllProduct(req, res) {
        try {
            if (Object.keys(req.query).length === 0) {
                const products = await productModel.find();
                res.json({ products });
            } else {
                /* Filtering */
                const queryObj = { ...req.query };
                const excludeFields = ["page", "fields", "limit", "sort"];
                excludeFields.forEach((el) => delete queryObj[el]);
                let queryStr = JSON.stringify(queryObj);
                queryStr = queryStr.replace(/\b(equals|ne|gt|lt|gte|lte)\b/g, (match) => `$${match}`);
                let query = productModel.find(JSON.parse(queryStr));

                /* Sorting */
                if (req.query.sort) {
                    const sortBy = req.query.sort.split(",").join(" ");
                    query = query.sort(sortBy);
                }

                /* Limiting and Fields */
                if (req.query.fields) {
                    const fields = req.query.fields.split(",").join(" ");
                    query = query.select(fields);
                } else {
                    query = query.select("-__v");
                }

                /* Pagination */
                const page = req.query.page;
                const limit = 24;
                const skip = (page - 1) * limit;
                query = query.limit(limit).skip(skip);

                /* Check if the requested page exists */
                if (req.query.page) {
                    const productCount = await productModel.countDocuments(JSON.parse(queryStr));
                    if (skip >= productCount) {
                        return res.status(404).json({ error: "This page does not exist." });
                    }
                }

                const products = await query;
                const totalProducts = await productModel.countDocuments(JSON.parse(queryStr));
                const totalPages = Math.ceil(totalProducts / limit);

                res.json({
                    products,
                    currentPage: page,
                    totalPages,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getBodyProduct(req, res) {
        const cate = await productModel.distinct("category");
        const info = await productModel.distinct("tags");
        const brand = await productModel.distinct("brand");
        res.json({
            cate,
            info,
            brand,
        });
    }
    /* [PATCH] api/product/wishlist*/
    async addToWishList(req, res) {
        const { prodId } = req.body;
        const { _id } = req.user;
        try {
            const user = await userModel.findById(_id);

            const alreadyAdded = user.wishlists.find((wishlistId) => wishlistId.toString() === prodId);
            if (alreadyAdded) {
                const user = await userModel.findByIdAndUpdate(
                    _id,
                    {
                        $pull: { wishlists: prodId },
                    },
                    {
                        new: true,
                    }
                );
                res.json(user);
            } else {
                const user = await userModel.findByIdAndUpdate(
                    _id,
                    {
                        $push: { wishlists: prodId },
                    },
                    {
                        new: true,
                    }
                );
                res.json(user);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    /* [PUT] api/product/rating */
    async rating(req, res) {
        const { _id } = req.user;
        const { star, prodId, comment } = req.body;

        try {
            const product = await productModel.findById(prodId);
            const infoUserRate = await userModel.findById(_id, "firstName lastName email");
            if (!product) {
                return res.status(404).json({ message: "Product not found!!!" });
            }

            const alreadyRatedIndex = product.ratings.findIndex((rating) => rating.postedBy && rating.postedBy.toString() === _id.toString());

            if (alreadyRatedIndex !== -1) {
                // Nếu đã đánh giá, cập nhật đánh giá hiện tại của họ
                product.ratings[alreadyRatedIndex].star = star;
                product.ratings[alreadyRatedIndex].comment = comment;
                product.ratings[alreadyRatedIndex].postedBy = infoUserRate;

                await product.save();

                let totalRating = product.ratings.length;
                let ratingSum = product.ratings.map((rating) => rating.star).reduce((acc, arr) => acc + arr, 0);

                let actualRating = Math.round(ratingSum / totalRating);

                // Cập nhật tổng đánh giá của sản phẩm
                product.totalRating = actualRating;
                await product.save();

                return res.json(product);
            } else {
                // Nếu chưa đánh giá, thêm đánh giá mới
                product.ratings.push({
                    postedBy: infoUserRate,
                    star,
                    comment,
                });

                await product.save();

                let totalRating = product.ratings.length;
                let ratingSum = product.ratings.map((rating) => rating.star).reduce((acc, arr) => acc + arr, 0);

                let actualRating = Math.round(ratingSum / totalRating);

                // Cập nhật tổng đánh giá của sản phẩm
                product.totalRating = actualRating;
                await product.save();

                return res.json(product);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new ProductController();
