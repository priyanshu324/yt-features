import express from "express";
import cors from "cors";
import ocrRoutes from "./routes/ocr.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import ocrHistoryRoutes from "./routes/ocr.history.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

/* ✅ REQUIRED */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "https://yt-features.vercel.app",
      "https://yt-features-82azmh9wz-priyanshu845s-projects.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ocr", ocrRoutes);
app.use("/api/ocr", ocrHistoryRoutes);

app.use(errorMiddleware);

export default app;
