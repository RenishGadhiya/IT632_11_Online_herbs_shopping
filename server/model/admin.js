const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    admin_id:{
        type:String,
        required:true,
    },
    admin_name:{
        type:String,
        required:true,
    },
    admin_password:{
        type:String,
        required:true,
    },
    admin_email:{
        type:String,
        required:true,
    },
    admin_contact:{
        type:Number,
        required:true,
    },
});

module.exports = mongoose.model("ADMIN",admin);
