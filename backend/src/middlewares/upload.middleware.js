import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (_, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

  if (!allowed.includes(file.mimetype)) {
    cb(new Error("Unsupported file type"), false);
    return;
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});
