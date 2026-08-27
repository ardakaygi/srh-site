/**
 * Central place for business details the coding agent must NOT invent
 * (MASTER_PROMPT.md §4). Every value below is a clearly-marked placeholder
 * until the business owner confirms the real figure — grep this file
 * before launch, not the rest of the codebase, to find what's left to fill in.
 */
export const siteConfig = {
  businessName: "Samsun Robot Hastanesi",
  // TODO(confirm-before-launch): real production domain.
  siteUrl: "https://samsunrobothastanesi.com.tr",
  // Confirmed by the user directly in-session (2026-08-27) - not inferred.
  phoneDisplay: "0362 431 19 19",
  phoneHref: "tel:+903624311919",
  // TODO(confirm-before-launch): real WhatsApp business number, E.164 format, no leading +.
  whatsappNumber: "90XXXXXXXXXX",
  // TODO(confirm-before-launch): real workshop address.
  address: "Samsun (adres onaylanacak)",
  // TODO(confirm-before-launch): real working hours.
  workingHours: "Pzt-Cmt 09:00-18:00 (teyit edilecek)",
  // Confirmed by the user directly in-session (2026-08-27) - not inferred.
  warrantyLabel: "6 Ay Garanti",
} as const;

/** Builds a wa.me click-to-chat link with a Turkish, page-contextual pre-filled message. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
