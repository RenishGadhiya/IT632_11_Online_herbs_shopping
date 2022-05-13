const mongoose = require("mongoose");

const brand = new mongoose.Schema({
  brand_name: {
    type: String,
    required: true,
  },
  brand_dor: {
    type: Date,
    default: Date.now(),
  },
  brand_status: {
    type: Number, // 0 : unverified	1 : verified	-1 : block
    default: 0,
  },
});

module.exports = mongoose.model("BRAND", brand);
