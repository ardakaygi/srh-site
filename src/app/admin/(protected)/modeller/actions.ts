"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/adminAuth";

export type ModelFormState = { error?: string };

export async function upsertModelAction(
  _prevState: ModelFormState,
  formData: FormData,
): Promise<ModelFormState> {
  await assertAdminSession();

  const id = String(formData.get("id") ?? "");
  const brandId = String(formData.get("brandId") ?? "");
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const partsNote = String(formData.get("partsNote") ?? "").trim();
  const suctionPaRaw = String(formData.get("suctionPa") ?? "").trim();
  const batteryMahRaw = String(formData.get("batteryMah") ?? "").trim();
  const runtimeMinRaw = String(formData.get("runtimeMin") ?? "").trim();

  let issuePairs: { a: string; b: string }[] = [];
  try {
    issuePairs = JSON.parse(String(formData.get("commonIssues") ?? "[]"));
  } catch {
    issuePairs = [];
  }
  const commonIssues = JSON.stringify(
    issuePairs.filter((p) => p.a.trim()).map((p) => ({ title: p.a, description: p.b })),
  );

  if (!brandId || !slug || !name) {
    return { error: "Marka, slug ve isim zorunludur." };
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug yalnızca küçük harf, rakam ve tire içerebilir." };
  }

  const data = {
    brandId,
    slug,
    name,
    partsNote: partsNote || "",
    commonIssues,
    suctionPa: suctionPaRaw ? Number(suctionPaRaw) : null,
    batteryMah: batteryMahRaw ? Number(batteryMahRaw) : null,
    runtimeMin: runtimeMinRaw ? Number(runtimeMinRaw) : null,
  };

  if (id === "yeni") {
    const existing = await prisma.model.findUnique({
      where: { brandId_slug: { brandId, slug } },
    });
    if (existing) return { error: "Bu markada bu slug zaten kullanılıyor." };
    const created = await prisma.model.create({ data });
    revalidatePath("/admin/modeller");
    redirect(`/admin/modeller/${created.id}`);
  } else {
    await prisma.model.update({ where: { id }, data });
    revalidatePath("/admin/modeller");
    revalidatePath(`/admin/modeller/${id}`);
  }

  return {};
}

export async function deleteModelAction(formData: FormData): Promise<void> {
  await assertAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.model.delete({ where: { id } });
  revalidatePath("/admin/modeller");
  redirect("/admin/modeller");
}
