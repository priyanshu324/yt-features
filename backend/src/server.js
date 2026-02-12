import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
// import { seedAdminUser } from "./utils/seedAdmin.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();

    // 2️⃣ Ensure admin user exists
    // await seedAdminUser();

    // 3️⃣ Start HTTP server
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error("[SERVER] Failed to start:", err);
    process.exit(1);
  }
};

startServer();
