import Tesseract from "tesseract.js";
import { tesseractOptions } from "../config/tesseract.config.js";

export const runOCR = async (imagePath, lang) => {
  const { data } = await Tesseract.recognize(
    imagePath,
    lang === "auto" ? "eng+hin" : lang,
    tesseractOptions,
  );

  return data.text;
};
