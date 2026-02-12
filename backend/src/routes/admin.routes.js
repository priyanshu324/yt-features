import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { OCRResult } from "../models/ocrResult.model.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  const users = await User.countDocuments();
  const ocrs = await OCRResult.countDocuments();

  res.json({
    users,
    ocrs,
  });
});

export default router;
