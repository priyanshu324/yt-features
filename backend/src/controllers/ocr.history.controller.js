import { OCRResult } from "../models/ocrResult.model.js";

export const getOCRHistory = async (req, res, next) => {
  try {
    const results = await OCRResult.find({ userId: req.user }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: results,
    });
  } catch (err) {
    next(err);
  }
};
