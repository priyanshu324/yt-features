export const validateLanguage = (lang) => {
  const allowed = ["eng", "hin", "auto"];
  if (!allowed.includes(lang)) {
    throw new Error("Unsupported language");
  }
};
export const validateImageUrl = (url) => {
  try {
    new URL(url);
  } catch {
    throw new Error("Invalid image URL");
  }
};
