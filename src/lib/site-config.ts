/**
 * Central place for business details the coding agent must NOT invent
 * (MASTER_PROMPT.md §4). Every value below is a clearly-marked placeholder
 * until the business owner confirms the real figure — grep this file
 * before launch, not the rest of the codebase, to find what's left to fill in.
 */
export const siteConfig = {
  businessName: "Samsun Robot Hastanesi",
  // Confirmed by the user directly in-session (2026-08-27) - not inferred.
  // This is the registered legal/commercial entity operating the
  // "Samsun Robot Hastanesi" consumer-facing brand; used on legal pages
  // (KVKK, Yasal Uyarı) where the actual ticaret unvanı is required.
  // Full official ticaret unvanı as it appears on the business's Türk
  // Patent ve Marka Kurumu trademark application receipt (2024/135167,
  // 15.10.2024) - a more authoritative source than the shortened form the
  // user gave verbally, and consistent with it (same company).
  legalEntityName:
    "Starfon Teknoloji Elektronik Telefon Bilgisayar Sanayi ve Ticaret Limited Şirketi",
  // TODO(confirm-before-launch): real production domain.
  siteUrl: "https://samsunrobothastanesi.com.tr",
  // Confirmed by the user directly in-session (2026-08-27) - not inferred.
  phoneDisplay: "0362 431 19 19",
  phoneHref: "tel:+903624311919",
  // TODO(confirm-before-launch): real WhatsApp business number, E.164 format, no leading +.
  whatsappNumber: "90XXXXXXXXXX",
  // Confirmed by the user directly in-session (2026-08-27) - not inferred.
  address: "Kale Mah. Kasaplar Cad. No:16, İlkadım/Samsun",
  // Confirmed by the user directly in-session (2026-08-27) - not inferred.
  workingHours: "Pzt-Cmt 08:30-19:30",
  // Confirmed by the user directly in-session (2026-08-27) - not inferred.
  warrantyLabel: "6 Ay Garanti",
  // Confirmed by the user directly in-session (2026-08-28) - not inferred.
  // Used specifically for KVKK data-subject requests (kvkk-aydinlatma-metni).
  supportEmail: "destek@samsunrobothastanesi.com.tr",
  // Confirmed by the user directly in-session (2026-08-28) - not inferred.
  // General contact address, shown in the footer.
  contactEmail: "servis@samsunrobothastanesi.com.tr",
  // Confirmed by the user directly in-session (2026-08-28) - not inferred.
  cargoPartnerName: "Yurtiçi Kargo Servisi A.Ş.",
} as const;

/** Builds a wa.me click-to-chat link with a Turkish, page-contextual pre-filled message. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
