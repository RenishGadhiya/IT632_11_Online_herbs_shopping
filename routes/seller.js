const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product=require('../models/product')
const Order = require('../models/order')
const passport = require("passport");
const previousUrl=require("../middlewares/previousUrl")
const isLoggedIn=require("../middlewares/isLoggedIn")
const currentUrl=require("../middlewares/currentUrl")
const isSeller=require("../middlewares/isSeller")
// router.get("/seller/home",previousUrl,isLoggedIn,isSeller, (req, res) => {
//     try{
//     res.render("seller/sellerHome.ejs");
//     }
//     catch(e){
//         console.log(e);
//         res.status(404).render('error/error',{"status":"404"})

//     }
// })
router.get("/seller/orders",currentUrl,isLoggedIn,isSeller , async (req, res) => {
    try{
    
    const data = await  Users.findById(req.user._id).populate("orders");
    await data.populate({path:'orders.orderList.item',model:Product}).execPopulate();
    const orders=data.orders;
    res.render("seller/orders" ,{orders});
    // res.send(orders)
    }catch(e){
        console.log(e);
        res.status(404).render('error/error',{"status":"404"})
    }
    
  });
  router.get("/seller/orders",previousUrl,isLoggedIn,isSeller,async(req,res)=>{
    try{
    // const orders= await Order.find({}).populate('user').populate({ 
    //        path:'orderList.item',
    //        model:Product        
    // })
    const orders=await Order.find({})
    console.log(orders);
    // res.render('admin/adminOrders',{orders})
//    res.send(orders);
}
catch(e){
    console.log(e);
    res.status(404).render('error/error',{"status":"404"})

}
    // res.send({orders});
})

router.get("/seller/home",previousUrl,isLoggedIn,isSeller,async (req,res)=>{
    try{

        const sellerID =req.user._id;
        console.log(sellerID);
    const data = await Product.find({seller_id:sellerID});
    res.render("seller/sellerHome.ejs",{data});
    }
    catch(e){
        console.log(e);
        res.status(404).render('error/error',{"status":"404"})

    }
})

module.exports=router;