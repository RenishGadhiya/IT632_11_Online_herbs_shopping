const mongoose = require("mongoose");

const cart = new mongoose.Schema({

    cart_buyer_id: {
        type: String,
        required: true,
    },

    cart_product: [{
        type: {
            product_id: {
                type: String,
                required: true
            },
            product_qty: {
                type: String,
                required: true
            }
        },
        required: true
    }]
});

module.exports = mongoose.model("cart", cart);