const mongoose = require("mongoose");
var mongooseDelete = require("mongoose-delete");
const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                totalPrice: {
                    type: Number,
                    required: true,
                }
            },
        ],
        shippingAddress: {
            fullName: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
        },
        paymentMethod: { type: String, required: true },
        totalPriceAfterDiscount: {
            type: Number,
            required: true,
        },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        orderStatus: { type: String, default: "Ordered" },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        paidAt: { type: Date, default: Date.now() },
        month: {
            type: String,
            default: new Date().getMonth() + 1,
        },
    },
    {
        timestamps: true,
    }
);

orderSchema.plugin(mongooseDelete);

module.exports = mongoose.model("Order", orderSchema);
