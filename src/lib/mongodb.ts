import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("No mongodb URI");
  }
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected✅");
  } catch (error) {
    console.log("🚫DB connection error: ", (error as Error).message);
  }
};
