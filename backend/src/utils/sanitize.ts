/**
 * Input sanitization utilities
 */

export const sanitizeString = (input: string): string => {
  if (typeof input !== "string") return "";
  return input.trim().replace(/[<>]/g, "");
};

export const sanitizeEmail = (email: string): string => {
  return sanitizeString(email).toLowerCase();
};

export const sanitizeSlug = (slug: string): string => {
  return sanitizeString(slug)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const validateSlug = (slug: string): boolean => {
  return /^[a-z0-9-]+$/.test(slug) && slug.length >= 2 && slug.length <= 50;
};
