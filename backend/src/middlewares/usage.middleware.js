export const enforceDailyLimit = async (req, res, next) => {
  // 🔓 ADMIN = UNLIMITED
  if (req.user.role === "admin") {
    return next();
  }

  const today = new Date().toDateString();

  if (
    !req.user.dailyUsage ||
    new Date(req.user.dailyUsage.lastUsed).toDateString() !== today
  ) {
    req.user.dailyUsage = {
      count: 0,
      lastUsed: new Date(),
    };
  }

  if (req.user.dailyUsage.count >= Number(process.env.DAILY_OCR_LIMIT)) {
    return res.status(429).json({
      message: "Daily OCR limit reached",
    });
  }

  req.user.dailyUsage.count += 1;
  req.user.dailyUsage.lastUsed = new Date();

  await req.user.save(); // ✅ VALID NOW

  next();
};
