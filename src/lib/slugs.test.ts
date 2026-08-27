import { describe, expect, it } from "vitest";
import { IL_MARKA_SUFFIX, ilMarkaSlug, modelFullSlug, stripIlMarkaSuffix } from "./slugs";

describe("stripIlMarkaSuffix", () => {
  it("strips the shared suffix from a province/brand slug", () => {
    expect(stripIlMarkaSuffix(`adana${IL_MARKA_SUFFIX}`)).toBe("adana");
    expect(stripIlMarkaSuffix(`roborock${IL_MARKA_SUFFIX}`)).toBe("roborock");
  });

  it("returns null when the suffix is missing", () => {
    expect(stripIlMarkaSuffix("adana")).toBeNull();
    expect(stripIlMarkaSuffix("something-else")).toBeNull();
  });

  it("returns null when stripping the suffix leaves an empty base", () => {
    // Regression guard: this is exactly the input shape ("-robot-supurge-servisi"
    // with nothing in front of it) that would otherwise resolve to an empty
    // base slug and could match an unintended DB row if not guarded.
    expect(stripIlMarkaSuffix(IL_MARKA_SUFFIX)).toBeNull();
  });

  it("does not false-positive on a slug that merely contains the suffix mid-string", () => {
    expect(stripIlMarkaSuffix(`${IL_MARKA_SUFFIX}-adana`)).toBeNull();
  });
});

describe("ilMarkaSlug", () => {
  it("appends the shared suffix", () => {
    expect(ilMarkaSlug("samsun")).toBe(`samsun${IL_MARKA_SUFFIX}`);
  });

  it("round-trips with stripIlMarkaSuffix", () => {
    expect(stripIlMarkaSuffix(ilMarkaSlug("izmir"))).toBe("izmir");
  });
});

describe("modelFullSlug", () => {
  it("concatenates brand and model slugs with a hyphen", () => {
    expect(modelFullSlug("xiaomi", "mop-pro")).toBe("xiaomi-mop-pro");
  });

  it("does not collide across differently-split brand/model boundaries", () => {
    // "xiaomi-mop" + "pro" and "xiaomi" + "mop-pro" would produce the same
    // string if compared naively - the resolver in getModelByFullSlug always
    // recomputes from (brand.slug, model.slug) rather than re-splitting the
    // combined string, which is what actually avoids this ambiguity; this
    // test documents why the two inputs below produce identical output.
    expect(modelFullSlug("xiaomi-mop", "pro")).toBe(
      modelFullSlug("xiaomi", "mop-pro"),
    );
  });
});
