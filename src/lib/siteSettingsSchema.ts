/**
 * Pure schema/types for the site-settings feature - deliberately has NO
 * import of `@/lib/prisma` (unlike siteSettings.ts, which re-exports
 * these). Split out (2026-08-28) so client components (e.g.
 * SiteSettingsForm.tsx) can use SITE_SETTINGS_SCHEMA without webpack
 * trying to bundle the server-only mariadb driver adapter into the
 * browser build - see src/lib/prisma.ts's comment on why that adapter
 * exists.
 */
export const SITE_SETTINGS_SCHEMA = {
  brand_tagline: {
    label: "Marka sloganı (header üst çubuğu + footer'da gösterilir)",
    isJson: false,
    default: "Karadeniz'in En Kapsamlı Robot Süpürge Tamir Merkezi",
  },
  trust_badges: {
    label: "Güven rozetleri (her satıra bir tane)",
    isJson: true,
    default: ["Ücretsiz Arıza Tespiti", "Orijinal Yedek Parça", "6 Ay Garanti", "Anlaşmalı Kargo"],
  },
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
