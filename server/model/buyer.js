const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const buyerSchema = new mongoose.Schema({
  buyer_name: {
    type: String,
    required: true,
  },
  buyer_password: {
    type: String,
    required: true,
  },
  buyer_address: {
    type: String,
    required: true,
  },
  buyer_city: {
    type: String,
    required: true,
  },
  buyer_pincode: {
    type: Number,
    required: true,
  },
  buyer_state: {
    type: String,
    required: true,
  },
  buyer_email: {
    type: String,
    required: true,
  },
  buyer_contact: {
    type: Number,
    required: true,
  },

  buyer_image: {
    type: String,
  },
  buyer_dor: {
    type: Date,
    default: Date.now(),
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});
buyerSchema.methods.generateAuthToken = async function () {
  try {
    let myToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: myToken });
    await this.save();
    return myToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("BUYER", buyerSchema);
