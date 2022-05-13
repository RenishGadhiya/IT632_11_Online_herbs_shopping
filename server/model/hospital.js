const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const hospitalSchema = new mongoose.Schema({
  hospital_name: {
    type: String,
    required: true,
  },

  hospital_password: {
    type: String,
    required: true,
  },

  hospital_email: {
    type: String,
    required: true,
  },

  hospital_phone_no: {
    type: Number,
    required: true,
  },

  hospital_state: {
    type: String,
    required: true,
  },

  hospital_license_no: {
    type: String,
    required: true,
  },

  hospital_address: {
    type: String,
    required: true,
  },

  hospital_city: {
    type: String,
    required: true,
  },

  hospital_pincode: {
    type: Number,
    required: true,
  },

  hospital_image: {
    type: String,
  },

  hospital_disease_tag: {
    type: String,
    required: true,
  },

  hospital_status: {
    type: Number,
    default: 0,
  },

  hospital_dor: {
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

hospitalSchema.methods.generateAuthToken = async function () {
  try {
    let myToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: myToken });
    await this.save();
    return myToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("HOSPITAL", hospitalSchema);
