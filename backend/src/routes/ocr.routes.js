import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { enforceDailyLimit } from "../middlewares/usage.middleware.js";
import {
  processUpload,
  getHistory,
  processImageUrl,
} from "../controllers/ocr.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/url", protect, enforceDailyLimit, processImageUrl);
router.post(
  "/upload",
  protect,
  enforceDailyLimit,
  upload.array("files"), // ✅ THIS WAS MISSING
  processUpload,
);
router.get("/history", protect, getHistory);

export default router;
