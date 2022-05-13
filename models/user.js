const mongoose = require('mongoose');
// const products=require('./product')
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate=require('mongoose-findorcreate');
const userSchema =mongoose.Schema({
    username:{
        type:String
    },
    // googleid:{
    //     type:String
    // },
    // email:{
    //     type:String
    // },
    state: {
        type: String,        
    },
    city: {
        type: String,        
        required: [true, "Please enter your city"],
    },
    address: {
        type: String,
        required: [true, "Please enter your address"]
    },
    pincode: {
        type: Number, 
        required: [true, "Please enter your pincode"],       
        min:000000,
        max:999999,
    },
    contact: {
        type: Number,        
        required: [true, "Please enter your contact number"],
        min:0000000000,
        max:9999999999,
    },
    photo:{
        type:String
    },
    image:{
      data:Buffer,
      contentType:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    cart:[
        {
        item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products"
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    orders:[{
        type:mongoose.ObjectId,
        ref:"orders"
    }],
    role:{
        type:String,
        default:"Customer"
    },
    dor: {
        type: Date,
        default: Date.now(),
    }
})
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User= mongoose.model("users",userSchema)
module.exports=User;