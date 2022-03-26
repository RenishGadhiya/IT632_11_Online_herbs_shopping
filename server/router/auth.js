const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/connection");
const Seller = require("../model/seller");
const Hospital= require("../model/hospital");


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

//---------------------------------------
//to register the Hospital in the website
router.post("/hospitalregister", async (req, res) => {
  const {
    hospital_name,
    hospital_password,
    hospital_email,
    hospital_phone_no,
    hospital_address,
    hospital_city,
    hospital_state,
    hospital_license_no,
    hospital_pincode,
    hospital_disease_tag,
    hospital_image,
  } = req.body;
  if (
    !hospital_name ||
    !hospital_password ||
    !hospital_email ||
    !hospital_phone_no ||
    !hospital_address ||
    !hospital_city ||
    !hospital_state ||
    !hospital_license_no ||
    !hospital_pincode ||
    !hospital_disease_tag 

  ) {
    return res
      .status(422)
      .json({ err: "Please Enter in All the required field" });
  }
  try {
    const hospitalExist = await Hospital.findOne({ hospital_email: hospital_email });

    if (hospitalExist) {
      console.log(hospital_email);
      return res.status(400).json({ error: "Hospital already exist" });
    }

    const hospital_dor = new Date();
    const hospital_status = 0;

    const newHospital = new Hospital({
      hospital_name,
      hospital_password,
      hospital_email,
      hospital_phone_no,
      hospital_address,
      hospital_city,
      hospital_state,
      hospital_license_no,
      hospital_pincode,
      hospital_disease_tag,
      hospital_status,
      hospital_image,
      hospital_dor,
    });
    newHospital.hospital_password = await bcrypt.hash(
      newHospital.hospital_password,
      12
    );
    await newHospital.save();
    console.log("Hospital registreted succesusfully");
    res.status(200).json({ messgae: "Hospital registreted successufully" });
  } catch (err) {
    console.log(err);
  }
});

// to login the Hospital to the website
router.post("/hospitallogin", async (req, res) => {
  try {
    const { hospital_email, hospital_password } = req.body;
    if (!hospital_email || !hospital_password) {
      return res.status(400).json({ Error: "Please Fill all required filled" });
    }
    const hospitallogin = await Hospital.findOne({ hospital_email: hospital_email });
    if (hospitallogin) {
      const validPassword = await bcrypt.compare(
        hospital_password,
        hospitallogin.hospital_password
      );
      // cookies mate jovu
      // let token = await hospitallogin.generateAuthToken();
      // console.log("this is my token : ", token);
      //res.cookie("allhealcookie", token, { expiresIn: "1d", httpOnly: true });
      if (!validPassword) {
        res.status(400).json({ error: "Invalid Credential" });
      } else {
        res.status(200).json({ messgae: "Hospital Login Successfully" });
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
