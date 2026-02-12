import express from "express";
import { getOCRHistory } from "../controllers/ocr.history.controller.js";

const router = express.Router();

router.get("/history", getOCRHistory);

export default router;
