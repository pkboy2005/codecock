const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect("mongodb+srv://coder7650:JOIUOykLvO20cnD2@cluster0.x4to4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    
  } catch (error) {
    console.log(error)
  }
};

module.exports = connectDB;
