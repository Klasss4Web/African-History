// utils/slug.util.ts

/**
 * Generate a slug from a given string.
 * @param text - The text to convert into a slug.
 * @param existingSlugs - Optional list of existing slugs for uniqueness.
 */
export function generateSlug(
  text: string,
  existingSlugs: string[] = []
): string {
  if (!text) return "";

  // Normalize the text: lowercase, remove accents, replace spaces
  let baseSlug = text
    .toString()
    .normalize("NFD") // split letters and diacritics
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace into -
    .replace(/-+/g, "-"); // collapse multiple dashes

  let slug = baseSlug;
  let counter = 1;

  // Ensure uniqueness
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
