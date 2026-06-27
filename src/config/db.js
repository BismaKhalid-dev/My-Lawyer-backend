import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    if (process.env.VERCEL !== "1") {
      process.exit(1);
    }
    throw err;
  }
}