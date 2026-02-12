import { preprocessImage } from "../services/image.service.js";
import { runOCR } from "../services/ocr.service.js";
import { convertPdfToImages } from "../services/pdf.service.js";
import { cleanupFile } from "../utils/fileCleanup.js";
import { validateLanguage, validateImageUrl } from "../utils/validators.js";
import path from "path";
import fs from "fs";
import https from "https";
import { OCRResult } from "../models/ocrResult.model.js";

/**
 * ============================
 * OCR FILE UPLOAD CONTROLLER
 * ============================
 */
export const processUpload = async (req, res, next) => {
  console.log("\n================ OCR REQUEST START ================");

  try {
    const language = req.body?.language || "auto";

    validateLanguage(language);

    if (!req.files || req.files.length === 0) {
      console.error("[OCR] No files received");
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    console.log(`[OCR] Files received: ${req.files.length}`);
    console.log(`[OCR] Language: ${language}`);

    let combinedText = "";

    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase();

      console.log(`\n[OCR] Processing file: ${file.originalname}`);

      // ================= PDF FLOW =================
      if (ext === ".pdf") {
        console.log("[PDF] Converting PDF to images...");

        const pages = await convertPdfToImages(file.path);

        console.log(`[PDF] Pages generated: ${pages.length}`);

        if (!pages.length) {
          throw new Error("PDF conversion failed — no images generated");
        }

        for (let i = 0; i < pages.length; i++) {
          console.log(`[OCR] Processing page ${i + 1}/${pages.length}`);

          const cleaned = await preprocessImage(pages[i]);
          const text = await runOCR(cleaned, language);

          console.log(`[OCR] Page ${i + 1} text length: ${text.length}`);

          combinedText += `--- Page ${i + 1} ---\n${text}\n\n`;

          cleanupFile(pages[i]);
          cleanupFile(cleaned);
        }

        cleanupFile(file.path);
        console.log("[CLEANUP] PDF temp files removed");
      }

      // ================= IMAGE FLOW =================
      else {
        console.log("[IMAGE] Preprocessing image...");

        const cleaned = await preprocessImage(file.path);
        const text = await runOCR(cleaned, language);

        console.log(`[OCR] Image text length: ${text.length}`);

        combinedText += text + "\n\n";

        cleanupFile(file.path);
        cleanupFile(cleaned);

        console.log("[CLEANUP] Image temp files removed");
      }
    }

    console.log(`[OCR] TOTAL extracted text length: ${combinedText.length}`);
    console.log("================ OCR REQUEST SUCCESS ================\n");

    await OCRResult.create({
      userId: req.user._id,
      sourceType: combinedText.includes("--- Page") ? "pdf" : "image",
      pages: combinedText.includes("--- Page")
        ? combinedText.split("--- Page").length - 1
        : 1,
      text: combinedText.trim(),
      textLength: combinedText.length,
      language,
    });

    res.json({
      success: true,
      text: combinedText.trim(),
    });
  } catch (err) {
    console.error("=============== OCR REQUEST FAILED ===============");
    console.error("[ERROR]", err.message);
    console.error("=================================================\n");
    next(err);
  }
};

/**
 * ============================
 * IMAGE URL OCR CONTROLLER
 * ============================
 */
const downloadImage = (url, output) =>
  new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (!res.headers["content-type"]?.startsWith("image")) {
        reject(new Error("URL does not point to an image"));
        return;
      }

      const file = fs.createWriteStream(output);
      res.pipe(file);

      file.on("finish", () => file.close(resolve));
      file.on("error", reject);
    });
  });

export const processImageUrl = async (req, res, next) => {
  console.log("\n================ URL OCR REQUEST START ================");

  try {
    const { imageUrl, language = "auto" } = req.body;

    validateLanguage(language);
    validateImageUrl(imageUrl);

    console.log(`[URL] Image URL received`);
    console.log(`[OCR] Language: ${language}`);

    const tempPath = `uploads/url-${Date.now()}.png`;

    console.log("[URL] Downloading image...");
    await downloadImage(imageUrl, tempPath);

    console.log("[IMAGE] Preprocessing downloaded image...");
    const cleaned = await preprocessImage(tempPath);

    console.log("[OCR] Running OCR...");
    const text = await runOCR(cleaned, language);

    console.log(`[OCR] Extracted text length: ${text.length}`);

    cleanupFile(tempPath);
    cleanupFile(cleaned);

    console.log("[CLEANUP] URL temp files removed");
    console.log("================ URL OCR REQUEST SUCCESS ================\n");

    res.json({
      success: true,
      text,
    });
  } catch (err) {
    console.error("=============== URL OCR REQUEST FAILED ===============");
    console.error("[ERROR]", err.message);
    console.error("=====================================================\n");
    next(err);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const results = await OCRResult.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: results,
    });
  } catch (err) {
    next(err);
  }
};
