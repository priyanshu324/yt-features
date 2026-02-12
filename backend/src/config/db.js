import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("[DB] MONGO_URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "creator_ocr",
    });

    console.log("[DB] MongoDB connected successfully");
  } catch (error) {
    console.error("[DB] MongoDB connection failed");
    console.error(error.message);
    process.exit(1);
  }
};
