const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const sellerSchema = new mongoose.Schema({
  seller_id: {
    type: String,
    required: true,
  },
  seller_name: {
    type: String,
    required: true,
  },
  seller_password: {
    type: String,
    required: true,
  },
  seller_gst_no: {
    type: String,
    required: true,
  },
  seller_address: {
    type: String,
    required: true,
  },
  seller_city: {
    type: String,
    required: true,
  },
  seller_state: {
    type: String,
    required: true,
  },
  seller_pincode: {
    type: Number,
    required: true,
  },
  seller_phone_no: {
    type: Number,
    required: true,
  },
  seller_email: {
    type: String,
    required: true,
  },
  seller_image: {
    type: String,
  },
  seller_status: {
    type: Number,
    required: true,
    default: 0,
  },
  seller_dor: {
    type: Date,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

sellerSchema.methods.generateAuthToken = async function () {
  try {
    let myToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: myToken });
    await this.save();
    return myToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("SELLER", sellerSchema);
