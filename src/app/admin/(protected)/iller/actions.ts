"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/adminAuth";
import { ilMarkaSlug } from "@/lib/slugs";

export type ProvinceFormState = { error?: string; success?: boolean };

export async function updateProvinceAction(
  _prevState: ProvinceFormState,
  formData: FormData,
): Promise<ProvinceFormState> {
  await assertAdminSession();

  const id = String(formData.get("id") ?? "");
  const leadTimeLabel = String(formData.get("leadTimeLabel") ?? "").trim();
  const regionalIntro = String(formData.get("regionalIntro") ?? "").trim();
  const topBrandSlugsRaw = String(formData.get("topBrandSlugs") ?? "");
  const faqRaw = String(formData.get("faq") ?? "[]");

  if (!id || !leadTimeLabel || !regionalIntro) {
    return { error: "Teslimat süresi ve bölge tanıtım metni zorunludur." };
  }

  const topBrandSlugs = JSON.stringify(
    topBrandSlugsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );

  let faqPairs: { a: string; b: string }[] = [];
  try {
    faqPairs = JSON.parse(faqRaw);
  } catch {
    faqPairs = [];
  }
  const faqJson = JSON.stringify(
    faqPairs.filter((p) => p.a.trim()).map((p) => ({ question: p.a, answer: p.b })),
  );

  const province = await prisma.province.update({
    where: { id },
    data: { leadTimeLabel, regionalIntro, topBrandSlugs, faqJson },
  });

  revalidatePath("/admin/iller");
  revalidatePath(`/admin/iller/${id}`);
  revalidatePath(`/${ilMarkaSlug(province.slug)}`);
  revalidatePath("/hizmet-bolgeleri");

  return { success: true };
}
