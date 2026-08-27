/** Normalizes a Turkish phone number to digits-only for consistent storage/lookup comparison. */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Converts a Turkish phone number (any common input shape - leading 0,
 * leading +90, or bare 10-digit subscriber number) to the 12-digit
 * "90XXXXXXXXXX" MSISDN format Verimor's SMS API expects (see sms.ts).
 * Returns null if the digits don't resolve to a plausible TR number.
 */
export function toTrMsisdn(phone: string): string | null {
  const digits = normalizePhone(phone);
  if (digits.length === 10) return `90${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `90${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith("90")) return digits;
  return null;
}
