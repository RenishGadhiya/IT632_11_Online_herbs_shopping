const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  
  disease_name: {
    type: String,
    required: true,
  },

  disease_description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DISEASE", diseaseSchema);
