"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/adminAuth";

export type FaqFormState = { error?: string };

export async function upsertFaqItemAction(
  _prevState: FaqFormState,
  formData: FormData,
): Promise<FaqFormState> {
  await assertAdminSession();

  const id = String(formData.get("id") ?? "");
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const sortOrderRaw = String(formData.get("sortOrder") ?? "0");

  if (!question || !answer) {
    return { error: "Soru ve cevap zorunludur." };
  }

  const data = { question, answer, sortOrder: Number(sortOrderRaw) || 0 };

  if (id === "yeni") {
    await prisma.faqItem.create({ data });
  } else {
    await prisma.faqItem.update({ where: { id }, data });
  }

  revalidatePath("/admin/sss");
  revalidatePath("/sss");
  redirect("/admin/sss");
}

export async function deleteFaqItemAction(formData: FormData): Promise<void> {
  await assertAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.faqItem.delete({ where: { id } });
  revalidatePath("/admin/sss");
  revalidatePath("/sss");
  redirect("/admin/sss");
}
