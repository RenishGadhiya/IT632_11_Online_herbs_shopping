const mongoose = require("mongoose");

const blog = new mongoose.Schema({
    blog_id:{
        type:String,
        required:true,
    },
    blog_title:{
        required:true,
        type:String,
    },
    blog_description:{
        type:String,
        required:true,
    },
    blog_image:{
        type:String,        
    },
});

module.exports = mongoose.model("blog",blog);
