const Product = require("../model/product");
exports.product_name_search=async (req,res)=>
{
    var name=req.params.name;
    console.log(name);
    let data=await Product.find({ product_name:{$regex:name,$options:"i"}})
    let arr=await (await Product.find({})).forEach(function(x){        
        if(name.toString().indexOf(x.product_name)!=-1)
    {
        res.status(201).json({message:x});    
    }
    });    
    res.status(201).json({message:data});
};
exports.product_disease_search=async (req,res)=>
{
    var name=req.params.name;
    console.log(name);
        let data1=await Product.find({'product_disease_name.disease1':{$regex:name,$options:"i"}})        
        let data2=await Product.find({'product_disease_name.disease2':{$regex:name,$options:"i"}})        
        let data3=await Product.find({'product_disease_name.disease3':{$regex:name,$options:"i"}})        
    if(!data1&&!data2&&!data3)
    {
        console.log("Diseases Not Found!");
    }
    let arr=[];
    if(data1.length>0)
    arr.push(data1);
    if(data2.length>0)
    arr.push(data2);
    if(data3.length>0)
    arr.push(data3);

    res.status(201).json({message:arr});
    
};

