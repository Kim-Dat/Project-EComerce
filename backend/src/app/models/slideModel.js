const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
    images: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Slide", slideSchema);
