require("dotenv").config(); // Load environment variables

const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL; // Read from .env file

if (!MONGODB_URL) {
  console.error("❌ MONGODB_URL is not defined! Check your .env file.");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB not connected:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
