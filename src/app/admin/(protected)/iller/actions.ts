"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/adminAuth";
import { ImageUploadError, saveUploadedImage } from "@/lib/imageUpload";
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
  const landmarkAlt = String(formData.get("landmarkAlt") ?? "").trim();
  const landmarkCredit = String(formData.get("landmarkCredit") ?? "").trim();
  const removeLandmark = formData.get("removeLandmark") === "on";
  const landmarkFile = formData.get("landmarkImage");

  if (!id || !leadTimeLabel || !regionalIntro) {
    return { error: "Teslimat süresi ve bölge tanıtım metni zorunludur." };
  }

  let landmarkImage: string | null | undefined; // undefined = don't touch existing
  if (landmarkFile instanceof File && landmarkFile.size > 0) {
    try {
      landmarkImage = await saveUploadedImage(landmarkFile, "provinces");
    } catch (err) {
      if (err instanceof ImageUploadError) return { error: err.message };
      throw err;
    }
  } else if (removeLandmark) {
    landmarkImage = null;
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
    data: {
      leadTimeLabel,
      regionalIntro,
      topBrandSlugs,
      faqJson,
      landmarkAlt: landmarkAlt || null,
      landmarkCredit: landmarkCredit || null,
      ...(landmarkImage !== undefined ? { landmarkImage } : {}),
    },
  });

  revalidatePath("/admin/iller");
  revalidatePath(`/admin/iller/${id}`);
  revalidatePath(`/${ilMarkaSlug(province.slug)}`);
  revalidatePath("/hizmet-bolgeleri");
  revalidatePath("/telif-ve-marka-bildirimi");

  return { success: true };
}
