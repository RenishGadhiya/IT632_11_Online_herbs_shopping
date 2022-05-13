const Buyer = require("../model/buyer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.buyerRegistration = async (req, res) => {
  const {
    buyer_name,
    buyer_password,
    buyer_address,
    buyer_city,
    buyer_pincode,
    buyer_state,
    buyer_email,
    buyer_contact,
    buyer_image,
  } = req.body;
  if (
    !buyer_name ||
    !buyer_password ||
    !buyer_address ||
    !buyer_city ||
    !buyer_state ||
    !buyer_pincode ||
    !buyer_contact ||
    !buyer_email
  ) {
    return res
      .status(422)
      .json({ err: "Please Enter in All the required field" });
  }
  try {
    const buyerExist = await Buyer.findOne({ buyer_email: buyer_email });

    if (buyerExist) {
      console.log(buyer_email);
      return res.status(400).json({ error: "Buyer already exist" });
    }

    const newBuyer = new Buyer({
      buyer_name,
      buyer_password,
      buyer_address,
      buyer_city,
      buyer_pincode,
      buyer_state,
      buyer_email,
      buyer_contact,
      buyer_image,
    });

    newBuyer.buyer_password = await bcrypt.hash(newBuyer.buyer_password, 12);
    await newBuyer.save();
    console.log("Buyer registreted succesusfully");
    res.status(200).json({ messgae: "Buyer registreted successufully" });
  } catch (err) {
    console.log(err);
  }
};

exports.buyerLogin = async (req, res) => {
  try {
    const { buyer_email, buyer_password } = req.body;

    if (!buyer_email || !buyer_password) {
      return res.status(400).json({ Error: "Please Fill all required filled" });
    }

    const buyerLogin = await Buyer.findOne({ buyer_email: buyer_email });
    if (buyerLogin) {
      const validPassword = await bcrypt.compare(
        buyer_password,
        buyerLogin.buyer_password
      );
      // cookies mate jovu
      // let token = await buyerLogin.generateAuthToken();
      // console.log("this is my token : ", token);
      // res.cookie("allhealcookie", token, { expiresIn: "1d", httpOnly: true });
      if (!validPassword) {
        res.status(400).json({ error: "Invalid Credential" });
      } else {
        res.status(200).json({ messgae: "Buyer Login Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credential" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ Error: "Login Failed!!!" });
  }
};
