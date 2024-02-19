const authRouter = require("./authRoute");
const productRouter = require("./productRoute");
const couponRouter = require("./couponRoute");
const enquiryRouter = require("./enquiryRoute");
const paymentRouter = require("./paymentRoute");
const bannerRouter = require("./bannerRoute");
const orderRouter = require("./orderRoute");
const slideRouter = require("./slideRoute");
function routes(app) {
    app.use("/api/user", authRouter);
    app.use("/api/product", productRouter);
    app.use("/api/coupon", couponRouter);
    app.use("/api/enquiry", enquiryRouter);
    app.use("/api/payment", paymentRouter);
    app.use("/api/order", orderRouter);
    app.use("/api/banner", bannerRouter);
    app.use("/api/slide", slideRouter);
}

module.exports = routes;
