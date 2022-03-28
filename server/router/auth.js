const express = require("express");
const router = express.Router();
require("../db/connection");

const sellerController = require("../controller/seller.auth");
const buyerController = require("../controller/buyer.auth");
const hospitalController = require("../controller/hospital.auth");
const productController = require("../controller/product.add");

router.get("/", (req, res) => {
  res.send("one jsdbcjsb ");
});

const middleware = (req, res, next) => {
  console.log("hello from my middleware");
  next();
};

router.get("/sellerregister", middleware, (req, res) => {
  console.log("Welcome to SignUP page from router");
  res.send("This is Seller Registration Page");
});

router.get("/sellerlogin", middleware, (req, res) => {
  console.log("Welcome to Signin page from router");
  res.send("This is Seller Login Page");
});

router.get("/hospitalregister", middleware, (req, res) => {
  console.log("Welcome to SignUP page from router : hospital");
  res.send("This is Hospital Registration Page");
});

router.get("/hospitallogin", middleware, (req, res) => {
  console.log("Welcome to Signin page from router : hospital");
  res.send("This is Hospital Login Page");
});

router.post("/sellerregister", sellerController.sellerRegistration);

router.post("/buyerregister", buyerController.buyerRegistration);

router.post("/hospitalregister", hospitalController.hospitalRegistration);

router.post("/sellerlogin", sellerController.sellerLogin);

router.post("/buyerlogin", buyerController.buyerLogin);

router.post("/hospitallogin", hospitalController.hospitalLogin);

router.post("/addproduct", productController.addProduct);

module.exports = router;
