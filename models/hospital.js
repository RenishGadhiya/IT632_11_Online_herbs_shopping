const mongoose = require("mongoose");
const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phone_no: {
    type: Number,
    required: true,
  },

  license_no: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  
  disease_tag: {
    type: String,
    required: true,
  },

  dor: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("hospital", hospitalSchema);
