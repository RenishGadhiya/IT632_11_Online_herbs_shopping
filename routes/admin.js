const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product=require('../models/product')
const Order = require('../models/order')
const Disease = require('../models/disease')
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const passport = require("passport");
const Hospital = require("../models/hospital");

const previousUrl=require("../middlewares/previousUrl")
const isLoggedIn=require("../middlewares/isLoggedIn")
const currentUrl=require("../middlewares/currentUrl")
const isAdmin=require("../middlewares/isAdmin")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,"/uploads/hospital"));
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


router.get("admin/addhospital",isLoggedIn, isAdmin, async(req,res)=>{
    res.render("admin/addhospital.ejs");
})

router.post("admin/addHospital", isLoggedIn, isAdmin, async (req, res) => {
    const { name, phone_no, address, license_no, disease_tag, image } = req.body;
      
    try {
      const newHospital = new Hospital({
        name,
        phone_no,
        address,
        license_no,
        disease_tag,
        image,
      });
      await newHospital.save();
      // res.render("admin/adminHome.ejs");
    } catch (err) {
      console.log(err);
    }
  });

router.get("/admin/home",previousUrl,isLoggedIn,isAdmin, (req, res) => {
    try{
       res.render("admin/adminHome.ejs");
    }
    catch(e){
        console.log(e);
        res.status(404).render('error/error',{"status":"404"})

    }
})
router.get("/admin/products",previousUrl,isLoggedIn,isAdmin,async (req,res)=>{
    try{
    const data = await Product.find({});
    res.render("admin/adminProducts.ejs",{data});
    }
    catch(e){
        console.log(e);
        res.status(404).render('error/error',{"status":"404"})

    }
})
router.get("/admin/user",previousUrl,isLoggedIn,isAdmin,async (req,res)=>{
    try{
    const person=await User.find({}).populate({
        path: 'orders cart.item',
        populate:{
            path: 'orderList.item',
            model:Product
        }
    });
res.render('admin/adminUser',{person});
    }
    catch(e){
        console.log(e);
        res.status(404).render('error/error',{"status":"404"})

    }

})
router.delete("/admin/user/:id",previousUrl,isLoggedIn,isAdmin,async (req, res) => {
    try{
    const {id}=req.params
    try{
    await User.findByIdAndDelete(id);
    req.flash('success',`The user was deleted successfully !`)
    res.redirect('/admin/user');
    }
    catch(err){
        req.flash('error','Sorry There was a problem in deleting the user').
        res.redirect('/admin/user')
    }
}catch(e){
    console.log(e);
    res.status(404).render('error/error',{"status":"404"})

}
})
router.get("/admin/orders",previousUrl,isLoggedIn,isAdmin,async(req,res)=>{
    try{
    const orders= await Order.find({}).populate('user').populate({ 
           path:'orderList.item',
           model:Product        
    })
    res.render('admin/adminOrders',{orders})
//    res.send(orders);
}
catch(e){
    console.log(e);
    res.status(404).render('error/error',{"status":"404"})

}
    // res.send({orders});
});

router.get(
    "/admin/disease",
    previousUrl,
    isLoggedIn,
    isAdmin,
    async (req, res) => {
      try {
        res.render("admin/adminDisease");
        //    res.send(orders);
      } catch (e) {
        console.log(e);
        res.status(404).render("error/error", { status: "404" });
      }
      // res.send({orders});
    }
  );
  
  router.get(
    "/admin/addHospital",
    previousUrl,
    isLoggedIn,
    isAdmin,
    async (req, res) => {
      try {

        const data = await Disease.find({});
        res.render("admin/adminHospital", {data});
        //    res.send(orders);
      } catch (e) {
        console.log(e);
        res.status(404).render("error/error", { status: "404" });
      }
      // res.send({orders});
    }
  );

  router.post(
    "/admin/disease",
    previousUrl,
    isLoggedIn,
    isAdmin,
    async (req, res) => {
      try {
        let data = req.body;
        await Disease.create(data);
        req.flash("status", "Disease Added Sucessfully!!");
        res.redirect("/admin/products");
      } catch (e) {
        console.log(e);
        res.status(404).render("error/error", { status: "404" });
      }
    }
  );

  router.post(
    "/admin/addHospital",
    previousUrl,
    isLoggedIn,
    isAdmin,
    async (req, res) => {
      try {
        let data = req.body;
        await Hospital.create(data);
        req.flash("status", "Hospital Added Sucessfully!!");
        res.redirect("/admin/products");
      } catch (e) {
        console.log(e);
        res.status(404).render("error/error", { status: "404" });
      }
    }
  );

module.exports=router;