import { randomInt } from "crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I - avoids ambiguity when read aloud/typed

/** Generates a short, human-typeable tracking code like "SRH-7K4P9QXA". */
export function generateTrackingCode(): string {
  let suffix = "";
  for (let i = 0; i < 8; i++) {
    suffix += ALPHABET[randomInt(ALPHABET.length)];
  }
  return `SRH-${suffix}`;
}
