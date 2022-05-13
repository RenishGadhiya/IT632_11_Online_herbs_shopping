const mongoose=require("mongoose")
const Reviews=require("./reviews")
const User=require("./user")
const productSchema=new mongoose.Schema({
    name:{
        type:String
    },
    img:{
        type:String
    },
    image:{
        data :Buffer,
        contentType:String
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    desc:{
        type:String
    },
    disease:{
        type:String
    },
    reviews:[
        {
            type:mongoose.ObjectId,
            ref:"reviews"
        },
    ],
    seller_id:{
        type:String,                
    },
    dor: {
        type: Date,
        default: Date.now(),
    }
})
const Product=new mongoose.model("products",productSchema)
module.exports=Product;