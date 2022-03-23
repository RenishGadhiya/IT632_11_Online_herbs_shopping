const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospital_id: {
    type: String,
    required: true,
  },

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
    type: String,
    required: true,
  },

  hospital_DOR: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("HOSPITAL", hospitalSchema);