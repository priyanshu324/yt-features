export function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return /\.(jpg|jpeg|png|webp)$/i.test(parsed.pathname);
  } catch {
    return false;
  }
}

export function hasValidInput(
  files: FileList | null,
  imageUrl: string
): boolean {
  return Boolean(files?.length || imageUrl.trim());
}
