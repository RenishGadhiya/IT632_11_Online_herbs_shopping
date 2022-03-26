const mongoose = require("mongoose");

const category = new mongoose.Schema({
    category_name:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("CATEGORY", category);
