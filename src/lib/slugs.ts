export const IL_MARKA_SUFFIX = "-robot-supurge-servisi";

/** Strips the shared "-robot-supurge-servisi" suffix used by both province and brand pSEO pages. */
export function stripIlMarkaSuffix(slug: string): string | null {
  if (!slug.endsWith(IL_MARKA_SUFFIX)) return null;
  const base = slug.slice(0, -IL_MARKA_SUFFIX.length);
  return base.length > 0 ? base : null;
}

export function ilMarkaSlug(baseSlug: string): string {
  return `${baseSlug}${IL_MARKA_SUFFIX}`;
}

export function modelFullSlug(brandSlug: string, modelSlug: string): string {
  return `${brandSlug}-${modelSlug}`;
}
