const mongoose = require("mongoose");
const { double, boolean } = require("webidl-conversions");

const orderSchema = new mongoose.Schema({
  order_detail: [
    {
      type: {
        product_ID: {
          type: String,
          required: true,
        },

        seller_ID: {
          type: String,
          required: true,
        },

        order_Qty: {
          type: Number,
          required: true,
        },

        order_Status: {
          type: boolean,
          required: true,
        },
      },
      required: true,
    },
  ],

  buyer_ID: {
    type: String,
    required: true,
  },

  order_Date: {
    type: Date,
    default: Date.now(),
  },

  order_Price: {
    type: double,
    required: true,
  },

  order_Transaction_ID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ORDER", orderSchema);
