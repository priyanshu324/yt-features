import mongoose from "mongoose";

const ocrResultSchema = new mongoose.Schema(
  {
    sourceType: {
      type: String,
      enum: ["image", "pdf", "url"],
      required: true,
    },
    pages: {
      type: Number,
      default: 1,
    },
    text: {
      type: String,
      required: true,
    },
    textLength: {
      type: Number,
    },
    language: {
      type: String,
      default: "auto",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const OCRResult = mongoose.model("OCRResult", ocrResultSchema);
