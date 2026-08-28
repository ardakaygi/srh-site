"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/adminAuth";
import { AVAILABLE_COVER_IMAGES } from "./coverImages";

export type BlogFormState = { error?: string };

export async function upsertBlogPostAction(
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  await assertAdminSession();

  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "");
  const publishedAtRaw = String(formData.get("publishedAt") ?? "");
  const readMinutesRaw = String(formData.get("readMinutes") ?? "5");

  let sectionPairs: { a: string; b: string }[] = [];
  try {
    sectionPairs = JSON.parse(String(formData.get("sections") ?? "[]"));
  } catch {
    sectionPairs = [];
  }
  const sectionsJson = JSON.stringify(
    sectionPairs.filter((p) => p.a.trim()).map((p) => ({ heading: p.a, body: p.b })),
  );

  if (!slug || !title || !excerpt || !category || !publishedAtRaw) {
    return { error: "Slug, başlık, özet, kategori ve tarih zorunludur." };
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: "Slug yalnızca küçük harf, rakam ve tire içerebilir." };
  }
  if (!AVAILABLE_COVER_IMAGES.includes(coverImage)) {
    return { error: "Geçersiz kapak görseli." };
  }

  const data = {
    slug,
    title,
    excerpt,
    category,
    coverImage,
    publishedAt: new Date(publishedAtRaw),
    readMinutes: Number(readMinutesRaw) || 5,
    sectionsJson,
  };

  if (id === "yeni") {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) return { error: "Bu slug zaten kullanılıyor." };
    const created = await prisma.blogPost.create({ data });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");
    redirect(`/admin/blog/${created.id}`);
  } else {
    const before = await prisma.blogPost.findUnique({ where: { id } });
    await prisma.blogPost.update({ where: { id }, data });
    revalidatePath("/admin/blog");
    revalidatePath(`/admin/blog/${id}`);
    revalidatePath("/blog");
    if (before) revalidatePath(`/blog/${before.slug}`);
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/sitemap.xml");
  }

  return {};
}

export async function deleteBlogPostAction(formData: FormData): Promise<void> {
  await assertAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const post = await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  redirect("/admin/blog");
}
