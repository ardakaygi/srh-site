import { SITE_SETTINGS_SCHEMA, getSiteSettings, type SiteSettingKey } from "@/lib/siteSettings";
import { SiteSettingsForm } from "./SiteSettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSiteSettingsPage() {
  const settings = await getSiteSettings();

  const values: Record<string, string> = {};
  for (const key of Object.keys(SITE_SETTINGS_SCHEMA) as SiteSettingKey[]) {
    const schema = SITE_SETTINGS_SCHEMA[key];
    const value = settings[key];
    values[key] = schema.isJson
      ? (value as unknown as string[]).join("\n")
      : (value as string);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Site Ayarları</h1>
      <p className="mt-1 text-sm text-slate-500">
        Ana sayfadaki bazı pazarlama metinlerini buradan düzenleyebilirsiniz. Bir alanı boş
        bırakıp kaydederseniz mevcut değeri korunur (silinmez).
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <SiteSettingsForm values={values} />
      </div>
    </div>
  );
}
