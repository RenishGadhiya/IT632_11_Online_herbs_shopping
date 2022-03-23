const mongoose = require("mongoose");
const DB = process.env.DB_URL;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log("Connection ERROR"));

//
//
//
//  for connectiong database to front and and saving data to mongoatlas. add seeder and data and then run.
// require("dotenv").config();
// const mongoose = require("mongoose");
// const DB =
//   "mongodb+srv://allheal:ZGM71IV2m4tnaCrw@allheal.265d5.mongodb.net/AllHeal?retryWrites=true&w=majority";
// const connectDB = async () => {
//   try {
//     await mongoose.connect(DB);

//     console.log("MongoDB connection SUCCESS");
//   } catch (error) {
//     console.error("MongoDB connection FAIL" + error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
