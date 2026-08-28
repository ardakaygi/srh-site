"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/adminAuth";

export type BrandFormState = { error?: string };

function parsePairs(raw: string, aKey: string, bKey: string): string {
  let parsed: { a: string; b: string }[] = [];
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = [];
  }
  return JSON.stringify(
    parsed
      .filter((p) => p.a.trim())
      .map((p) => ({ [aKey]: p.a, [bKey]: p.b })),
  );
}

export async function upsertBrandAction(
  _prevState: BrandFormState,
  formData: FormData,
): Promise<BrandFormState> {
  await assertAdminSession();

  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const intro = String(formData.get("intro") ?? "").trim();
  const faultsJson = parsePairs(String(formData.get("faults") ?? "[]"), "title", "description");
  const faqJson = parsePairs(String(formData.get("faq") ?? "[]"), "question", "answer");

  if (!slug || !name || !intro) {
    return { error: "Slug, isim ve tanıtım metni zorunludur." };
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug yalnızca küçük harf, rakam ve tire içerebilir." };
  }

  const data = { slug, name, intro, faultsJson, faqJson };

  if (id === "yeni") {
    const existing = await prisma.brand.findUnique({ where: { slug } });
    if (existing) return { error: "Bu slug zaten kullanılıyor." };
    const created = await prisma.brand.create({ data });
    revalidatePath("/admin/markalar");
    redirect(`/admin/markalar/${created.id}`);
  } else {
    await prisma.brand.update({ where: { id }, data });
    revalidatePath("/admin/markalar");
    revalidatePath(`/admin/markalar/${id}`);
  }

  return {};
}

export async function deleteBrandAction(formData: FormData): Promise<void> {
  await assertAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.model.deleteMany({ where: { brandId: id } });
  await prisma.brand.delete({ where: { id } });
  revalidatePath("/admin/markalar");
  redirect("/admin/markalar");
}
