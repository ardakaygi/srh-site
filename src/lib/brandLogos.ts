/**
 * Brands we have an actual, properly-licensed logo file for
 * (public/brand-logos/, sourced from Wikimedia Commons - see decisions.md).
 * Never add a slug here without a real downloaded logo to match; brands
 * without one are shown as plain text links instead of a fabricated logo.
 */
export const POPULAR_BRAND_SLUGS = ["roborock", "xiaomi", "samsung", "dreame", "ecovacs", "irobot"];

export const BRAND_LOGO_MAP: Record<string, string> = {
  roborock: "/brand-logos/roborock.svg",
  xiaomi: "/brand-logos/xiaomi.svg",
  samsung: "/brand-logos/samsung.svg",
  dreame: "/brand-logos/dreame.svg",
  ecovacs: "/brand-logos/ecovacs.png",
  irobot: "/brand-logos/irobot.svg",
};
