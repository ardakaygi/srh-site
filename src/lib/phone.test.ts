import { describe, expect, it } from "vitest";
import { normalizePhone, toTrMsisdn } from "./phone";

describe("normalizePhone", () => {
  it("strips all non-digit characters", () => {
    expect(normalizePhone("0532 123 45 67")).toBe("05321234567");
    expect(normalizePhone("+90 (532) 123-45-67")).toBe("905321234567");
  });
});

describe("toTrMsisdn", () => {
  it("converts a leading-0 11-digit number to 90-prefixed MSISDN", () => {
    expect(toTrMsisdn("0532 123 45 67")).toBe("905321234567");
  });

  it("converts a bare 10-digit subscriber number to 90-prefixed MSISDN", () => {
    expect(toTrMsisdn("532 123 45 67")).toBe("905321234567");
  });

  it("passes through an already-90-prefixed 12-digit number unchanged", () => {
    expect(toTrMsisdn("+90 532 123 45 67")).toBe("905321234567");
  });

  it("returns null for implausible lengths", () => {
    expect(toTrMsisdn("123")).toBeNull();
    expect(toTrMsisdn("12345678901234")).toBeNull();
  });
});
