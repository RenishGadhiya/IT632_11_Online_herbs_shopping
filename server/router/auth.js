const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/connection");
const Seller = require("../model/seller");
var seller_id = "1111";

router.get("/", (req, res) => {
  res.send("Welcome to Root Page From Router");
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

//to register the seller in the website
router.post("/sellerregister", async (req, res) => {
  const {
    seller_name,
    seller_password,
    seller_gst_no,
    seller_address,
    seller_city,
    seller_state,
    seller_pincode,
    seller_phone_no,
    seller_email,
    seller_image,
  } = req.body;
  if (
    !seller_name ||
    !seller_password ||
    !seller_gst_no ||
    !seller_address ||
    !seller_city ||
    !seller_state ||
    !seller_pincode ||
    !seller_phone_no ||
    !seller_email
  ) {
    return res
      .status(422)
      .json({ err: "Please Enter in All the required field" });
  }
  try {
    const sellerExist = await Seller.findOne({ seller_email: seller_email });

    if (sellerExist) {
      console.log(seller_email);
      return res.status(400).json({ error: "Seller already exist" });
    }

    const seller_dor = new Date();
    //seller_id generation ??
    const newSeller = new Seller({
      seller_id,
      seller_name,
      seller_password,
      seller_gst_no,
      seller_address,
      seller_city,
      seller_state,
      seller_pincode,
      seller_phone_no,
      seller_email,
      seller_image,
      seller_dor,
    });
    newSeller.seller_password = await bcrypt.hash(
      newSeller.seller_password,
      12
    );
    await newSeller.save();
    console.log("Seller registreted succesusfully");
    res.status(200).json({ messgae: "Seller registreted successufully" });
  } catch (err) {
    console.log(err);
  }
});

// to login the seller to the website
router.post("/sellerlogin", async (req, res) => {
  try {
    const { seller_email, seller_password } = req.body;
    if (!seller_email || !seller_password) {
      return res.status(400).json({ Error: "Please Fill all required filled" });
    }
    const sellerLogin = await Seller.findOne({ seller_email: seller_email });
    if (sellerLogin) {
      const validPassword = await bcrypt.compare(
        seller_password,
        sellerLogin.seller_password
      );
      // cookies mate jovu
      // let token = await sellerLogin.generateAuthToken();
      // console.log("this is my token : ", token);
      //res.cookie("allhealcookie", token, { expiresIn: "1d", httpOnly: true });
      if (!validPassword) {
        res.status(400).json({ error: "Invalid Credential" });
      } else {
        res.status(200).json({ messgae: "Seller Login Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credential" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ Error: "Login Failed!!!" });
  }
});

module.exports = router;
