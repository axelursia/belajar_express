const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      // ambil drivers di mongodb.com
      "mongodb+srv://axelursia:Axelursia25__@cluster0.nmxbsnn.mongodb.net/si5a?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("Error : ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
