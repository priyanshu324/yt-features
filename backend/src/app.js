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
    origin: ["http://localhost:3000", "http://192.168.1.10:3000"],
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
