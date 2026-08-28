import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "./BlogPostForm";
import { AVAILABLE_COVER_IMAGES } from "../coverImages";
import { deleteBlogPostAction } from "../actions";

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default async function AdminBlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "yeni";

  const post = isNew ? null : await prisma.blogPost.findUnique({ where: { id } });
  if (!isNew && !post) notFound();

  const initial = {
    slug: post?.slug ?? "",
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    category: post?.category ?? "",
    coverImage: post?.coverImage ?? AVAILABLE_COVER_IMAGES[0],
    publishedAt: post ? toDateInputValue(post.publishedAt) : toDateInputValue(new Date()),
    readMinutes: post?.readMinutes ?? 5,
    sections: post
      ? (JSON.parse(post.sectionsJson) as { heading: string; body: string }[]).map((s) => ({
          a: s.heading,
          b: s.body,
        }))
      : [],
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/blog" className="text-sm text-brand-700 hover:underline">
        ← Tüm yazılar
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? "Yeni Blog Yazısı" : post!.title}
        </h1>
        {!isNew && (
          <form action={deleteBlogPostAction}>
            <input type="hidden" name="id" value={id} />
            <button
              type="submit"
              className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              Yazıyı Sil
            </button>
          </form>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <BlogPostForm id={id} initial={initial} />
      </div>
    </div>
  );
}
