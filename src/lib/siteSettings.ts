import { prisma } from "@/lib/prisma";
import { SITE_SETTINGS_SCHEMA, type SiteSettingKey } from "@/lib/siteSettingsSchema";

// Re-exported for existing server-side importers (admin actions/pages,
// Header/Footer, etc.) - the schema/type themselves now live in
// siteSettingsSchema.ts (no prisma import) so client components can use
// SITE_SETTINGS_SCHEMA without pulling the server-only mariadb driver
// adapter into the browser bundle. See that file's header comment.
export { SITE_SETTINGS_SCHEMA, type SiteSettingKey };

type ResolvedSettings = {
  [K in SiteSettingKey]: (typeof SITE_SETTINGS_SCHEMA)[K]["default"];
};

/** Reads all site settings, merging DB overrides over the built-in defaults. */
export async function getSiteSettings(): Promise<ResolvedSettings> {
  const rows = await prisma.siteSetting.findMany();
  const byKey = new Map(rows.map((r) => [r.key, r]));

  const result = {} as ResolvedSettings;
  for (const key of Object.keys(SITE_SETTINGS_SCHEMA) as SiteSettingKey[]) {
    const schema = SITE_SETTINGS_SCHEMA[key];
    const row = byKey.get(key);
    if (!row) {
      (result as Record<string, unknown>)[key] = schema.default;
      continue;
    }
    if (schema.isJson) {
      try {
        (result as Record<string, unknown>)[key] = JSON.parse(row.value);
      } catch {
        (result as Record<string, unknown>)[key] = schema.default;
      }
    } else {
      (result as Record<string, unknown>)[key] = row.value;
    }
  }
  return result;
}

export async function setSiteSetting(key: SiteSettingKey, value: string): Promise<void> {
  const schema = SITE_SETTINGS_SCHEMA[key];
  await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value, isJson: schema.isJson },
    update: { value },
  });
}
