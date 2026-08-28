import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const items = await prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sık Sorulan Sorular</h1>
          <p className="mt-1 text-sm text-slate-500">{items.length} soru. Sıra numarası küçükten büyüğe gösterilir.</p>
        </div>
        <Link
          href="/admin/sss/yeni"
          className="rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          + Yeni Soru
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/admin/sss/${item.id}`}
            className="block rounded-2xl border border-slate-200 bg-white p-4 hover:border-brand-300 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-slate-800">{item.question}</p>
              <span className="shrink-0 text-xs text-slate-400">#{item.sortOrder}</span>
            </div>
            <p className="mt-1 text-sm text-slate-500 line-clamp-2">{item.answer}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
