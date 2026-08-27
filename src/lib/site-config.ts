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
  // TODO(confirm-before-launch): real phone number.
  phoneDisplay: "0(XXX) XXX XX XX",
  phoneHref: "tel:+90XXXXXXXXXX",
  // TODO(confirm-before-launch): real WhatsApp business number, E.164 format, no leading +.
  whatsappNumber: "90XXXXXXXXXX",
  // TODO(confirm-before-launch): real workshop address.
  address: "Samsun (adres onaylanacak)",
  // TODO(confirm-before-launch): real working hours.
  workingHours: "Pzt-Cmt 09:00-18:00 (teyit edilecek)",
  // TODO(confirm-before-launch): actual warranty term the business offers.
  warrantyLabel: "Garanti süresi (teyit edilecek)",
} as const;

/** Builds a wa.me click-to-chat link with a Turkish, page-contextual pre-filled message. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
