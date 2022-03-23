const { Int32 } = require("bson");
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { double, boolean } = require("webidl-conversions");

const feedbackSchema = new mongoose.Schema({
    product_ID: {
        type: String,
        required: true,
    },

    buyer_ID: {
        type: String,
        required: true,
      },

    feedBack: {
        type: String,
        required: true,
    },  

    feedback_rating: {
        type: Number,
        required: true,
    },

    feedback_DOR: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("FEEDBACK", feedbackSchema);