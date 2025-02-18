const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URL = "mongodb+srv://coder7650:JOIUOykLvO20cnD2@cluster0.x4to4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(MONGO_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // mongoose.connect("mongodb://127.0.0.1:27017/codeIDE");
    console.log("MongoDB connected");
    console.log(process.env.MONGODB_URL);
    
  } catch (error) {
    console.log("MongoDB not connected",error)
  }
};

module.exports = connectDB;
