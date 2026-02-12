import sharp from "sharp";

export const preprocessImage = async (path) => {
  const output = path + "-clean.png";

  await sharp(path).grayscale().normalize().toFile(output);

  return output;
};
