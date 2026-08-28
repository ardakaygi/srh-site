import { prisma } from "@/lib/prisma";

/**
 * A small, explicit set of editable marketing-copy strings (admin panel:
 * /admin/site-ayarlari) - deliberately NOT a generic freeform CMS. Every
 * key here must be a value some page actually reads; adding a key without
 * wiring a reader just creates a dead admin field. Defaults below are the
 * real copy that shipped before this became editable (2026-08-28) - if a
 * key has no DB row yet (fresh install, or an admin cleared a field back
 * to "unset"), the site falls back to these rather than rendering blank.
 */
export const SITE_SETTINGS_SCHEMA = {
  hero_eyebrow: {
    label: "Ana sayfa üst rozet yazısı",
    isJson: false,
    default: "Samsun'dan Türkiye'nin 81 iline",
  },
  hero_rotating_phrases: {
    label: "Ana sayfa dönen arıza ifadeleri (her satıra bir tane)",
    isJson: true,
    default: [
      "Şarj Almıyorsa",
      "LiDAR Hatası Veriyorsa",
      "Haritalama Yapmıyorsa",
      "Mop Çalışmıyorsa",
      "Bağlantı Kurmuyorsa",
    ],
  },
  hero_description: {
    label: "Ana sayfa başlık altı açıklama",
    isJson: false,
    default:
      "Tüm marka ve modeller için arıza tespiti, onarım, yedek parça ve özel batarya yenileme hizmeti sunuyoruz.",
  },
  cta_title: {
    label: "Alt CTA başlığı",
    isJson: false,
    default: "{businessName} Farkını Yaşayın",
  },
  cta_description: {
    label: "Alt CTA açıklaması",
    isJson: false,
    default:
      "Cihazınızı adresinizden gönderin, ücretsiz arıza tespiti sonrası onayınızı alarak onarıma başlayalım.",
  },
} as const;

export type SiteSettingKey = keyof typeof SITE_SETTINGS_SCHEMA;

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
