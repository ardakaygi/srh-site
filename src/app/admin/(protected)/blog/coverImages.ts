// Plain constant, kept out of actions.ts - a "use server" file may only
// export async functions, not objects/arrays (Next.js build-time check).
export const AVAILABLE_COVER_IMAGES = [
  "/blog-covers/charger.jpg",
  "/blog-covers/stuck.jpg",
  "/blog-covers/mop.jpg",
  "/blog-covers/brush.jpg",
  "/blog-covers/navigation.jpg",
];
