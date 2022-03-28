const mongoose = require("mongoose");
const product = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_discription: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_discount: {
    type: Number,
    default: 0,
  },
  product_seller_id: {
    type: String,
    required: true,
  },
  product_category_id: {
    type: String,
    required: true,
  },
  product_brand_id: {
    type: String,
    required: true,
  },
  product_stock: {
    type: Number,
    required: true,
  },
  product_disease_name: {
    type: {
      disease1: {
        type: String,
        required: true,
      },
      disease2: {
        type: String,
      },
      disease3: {
        type: String,
      },
    },
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_status: {
    type: Number,
    default: 0,
  },
  product_dor: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("PRODUCT", product);
