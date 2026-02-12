import pdfPoppler from "pdf-poppler";
import fs from "fs";
import path from "path";

export const convertPdfToImages = async (pdfPath) => {
  console.log("\n[PDF] ================================");
  console.log("[PDF] Starting PDF → Image conversion");
  console.log(`[PDF] Source file: ${pdfPath}`);
  console.log("[PDF] Engine: Poppler (pdftoppm)");
  console.log("[PDF] ================================\n");

  const outputDir = "uploads";
  const baseName = path.basename(pdfPath, path.extname(pdfPath));

  const options = {
    format: "png",
    out_dir: outputDir,
    out_prefix: baseName,
    page: null, // convert all pages
  };

  try {
    // ✅ CORRECT API
    await pdfPoppler.convert(pdfPath, options);

    const files = fs
      .readdirSync(outputDir)
      .filter((file) => file.startsWith(baseName) && file.endsWith(".png"))
      .map((file) => path.join(outputDir, file))
      .sort();

    if (!files.length) {
      throw new Error("PDF conversion failed — no images generated");
    }

    console.log(`[PDF] Pages successfully generated: ${files.length}`);
    console.log("[PDF] Conversion SUCCESS");
    console.log("[PDF] ================================\n");

    return files;
  } catch (error) {
    console.error("[PDF][FATAL] PDF conversion FAILED");
    console.error("[PDF][ERROR MESSAGE]", error.message);
    console.error("[PDF] ================================\n");
    throw error;
  }
};
