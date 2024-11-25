import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ajpandit5050:BTaoFos2WM0Hhp51@cluster0.caiuw.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000,
      }
    );
    console.log("database connect....");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
// mongodb+srv://maxifywebsolutions:Maxify%40123@cluster0.ffjnxvs.mongodb.net/ludo
// Fh0pKNxrhfkbOoaY
// nafeeshmohd192
