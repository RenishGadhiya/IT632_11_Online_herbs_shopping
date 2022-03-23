const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

//environment variable DB_URL && PORT
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;

require("./db/connection");
const Seller = require("./model/seller");
app.use(require("./router/auth"));

app.listen(PORT, () => {
  console.log(`Server is Running at PORT No. : ${PORT}`);
});
