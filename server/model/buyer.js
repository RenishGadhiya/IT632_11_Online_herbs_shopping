const mongoose = require("mongoose");

const buyer = new mongoose.Schema({
    buyer_id:{
        type:String,
        required:true,
    },
    buyer_name:{
        type:String,
        required:true,
    },
    buyer_password:{
        type:String,
        required:true,
    },
    buyer_address:{
        type:String,
        required:true,
    },
    buyer_city:{
        type:String,
        required:true,
    },
    buyer_pincode:{
        type:Number,
        required:true,
    },

    buyer_state:{
        type:String,
        required:true,
    },
    buyer_email:{
        type:String,
        required:true,
    },
    buyer_contact:{
        type:Number,
        required:true,
    },

    buyer_image:{
        type:String,    
    },
    buyer_dor:{
        type:Date,
        required:true,
    },

});

module.exports = mongoose.model("BUYER",buyer);
