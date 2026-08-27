import { describe, expect, it } from "vitest";
import { generateTrackingCode } from "./tracking";

describe("generateTrackingCode", () => {
  it("produces an SRH- prefixed, 8-character uppercase alphanumeric code", () => {
    const code = generateTrackingCode();
    expect(code).toMatch(/^SRH-[A-Z0-9]{8}$/);
  });

  it("excludes visually ambiguous characters (0, O, 1, I)", () => {
    for (let i = 0; i < 200; i++) {
      const code = generateTrackingCode();
      expect(code).not.toMatch(/[01OI]/);
    }
  });

  it("is not trivially predictable across repeated calls", () => {
    const codes = new Set(Array.from({ length: 50 }, () => generateTrackingCode()));
    // With 50 draws from a ~32^8 space, collisions should not occur; a
    // failure here would indicate the RNG isn't actually varying output.
    expect(codes.size).toBe(50);
  });
});
