import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const seedAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn("[ADMIN] Admin credentials not set");
    return;
  }

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log("[ADMIN] Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: "Super Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
    dailyUsage: {
      count: 0,
      lastUsed: null,
    },
  });

  console.log("[ADMIN] Admin user created successfully");
};
