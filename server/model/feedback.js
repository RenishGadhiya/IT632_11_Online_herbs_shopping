const mongoose = require("mongoose");

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
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("FEEDBACK", feedbackSchema);
