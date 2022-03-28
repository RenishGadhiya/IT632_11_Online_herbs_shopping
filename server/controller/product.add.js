const Product = require("../model/product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addProduct = async (req, res) => {
  const {
    product_name,
    product_description,
    product_price,
    product_discount,
    product_category,
    product_brand,
    product_stock,
    product_disease_name1,
    product_disease_name2,
    product_disease_name3, //multiple value
    product_image,
  } = req.body;
  if (
    !product_name ||
    !product_description ||
    !product_price ||
    !product_discount ||
    !product_category ||
    !product_brand ||
    !product_stock ||
    !product_disease_name1 || //multiple value
    !product_image
  ) {
    return res
      .status(422)
      .json({ err: "Please Enter in All the required field" });
  }
  try {
    // sellerid, category id, brand id ko dalana hai yaha......
    const product_seller_id = "126513";
    const product_category_id = product_category;
    const product_brand_id = product_brand;
    disease1 = product_disease_name1;
    disease2 = product_disease_name2;
    disease3 = product_disease_name3;
    const product_disease_name = {
      disease1,
      disease2,
      disease3,
    };
    const newProduct = new Product({
      product_name,
      product_description,
      product_price,
      product_discount,
      product_seller_id,
      product_category_id,
      product_brand_id,
      product_stock,
      product_disease_name, //multiple value
      product_image,
    });

    await newProduct.save();
    console.log("Product registrete for Verification succesusfully");
    res
      .status(200)
      .json({ messgae: "Product registrete for Verification succesusfully" });
  } catch (err) {
    console.log(err);
  }
};
