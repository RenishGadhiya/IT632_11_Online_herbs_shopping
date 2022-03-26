const mongoose = require("mongoose");

const brand = new mongoose.Schema({
    brand_name:{
        type:String,
        required:true
    },
    brand_dor:{
        type:Date,
        required:true
    },
    brand_status:{
        type:Number,    // 0 : unverified	1 : verified	-1 : block
        required:true
    }
});

module.exports = mongoose.model("BRAND", brand);
