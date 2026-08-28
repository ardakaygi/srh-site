"use server";

import { revalidatePath } from "next/cache";
import { assertAdminSession } from "@/lib/adminAuth";
import { SITE_SETTINGS_SCHEMA, setSiteSetting, type SiteSettingKey } from "@/lib/siteSettings";

export type SiteSettingsFormState = { error?: string; success?: boolean };

export async function updateSiteSettingsAction(
  _prevState: SiteSettingsFormState,
  formData: FormData,
): Promise<SiteSettingsFormState> {
  await assertAdminSession();

  for (const key of Object.keys(SITE_SETTINGS_SCHEMA) as SiteSettingKey[]) {
    const schema = SITE_SETTINGS_SCHEMA[key];
    const raw = String(formData.get(key) ?? "");

    if (schema.isJson) {
      // Textarea, one entry per line -> JSON array.
      const lines = raw
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length === 0) continue; // don't overwrite with an empty array
      await setSiteSetting(key, JSON.stringify(lines));
    } else {
      if (!raw.trim()) continue; // don't overwrite with blank text
      await setSiteSetting(key, raw.trim());
    }
  }

  revalidatePath("/admin/site-ayarlari");
  revalidatePath("/");

  return { success: true };
}
