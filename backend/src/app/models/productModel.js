const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        sold: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: true,
        },
        tags: {
            type: String,
            required: true,
        },
        ratings: [
            {
                star: Number,
                postedBy: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                },
                comment: {
                    type: String,
                },
            },
        ],
        totalRating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
