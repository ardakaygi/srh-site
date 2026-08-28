import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatDate(date: Date): string {
  return date.toLocaleDateString("tr-TR", { dateStyle: "medium" });
}

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog</h1>
          <p className="mt-1 text-sm text-slate-500">{posts.length} yazı.</p>
        </div>
        <Link
          href="/admin/blog/yeni"
          className="rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          + Yeni Yazı
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Tarih</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{p.title}</td>
                <td className="px-4 py-3 text-slate-600">{p.category}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{formatDate(p.publishedAt)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/blog/${p.id}`} className="text-brand-700 hover:underline">
                    Düzenle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
