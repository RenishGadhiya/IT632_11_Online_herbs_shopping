const Hospital = require("../model/hospital");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.hospitalRegistration = async (req, res) => {
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
    const hospitalExist = await Hospital.findOne({
      hospital_email: hospital_email,
    });

    if (hospitalExist) {
      console.log(hospital_email);
      return res.status(400).json({ error: "Hospital already exist" });
    }

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
      hospital_image,
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
};

exports.hospitalLogin = async (req, res) => {
  try {
    const { hospital_email, hospital_password } = req.body;
    if (!hospital_email || !hospital_password) {
      return res.status(400).json({ Error: "Please Fill all required filled" });
    }
    const hospitallogin = await Hospital.findOne({
      hospital_email: hospital_email,
    });
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
};
