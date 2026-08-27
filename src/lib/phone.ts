/** Normalizes a Turkish phone number to digits-only for consistent storage/lookup comparison. */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}
