import fs from "fs";

export const cleanupFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.error("Cleanup failed:", err.message);
  });
};
