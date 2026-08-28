import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminModelsPage() {
  const models = await prisma.model.findMany({
    include: { brand: true },
    orderBy: [{ brand: { name: "asc" } }, { name: "asc" }],
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Modeller</h1>
          <p className="mt-1 text-sm text-slate-500">{models.length} model.</p>
        </div>
        <Link
          href="/admin/modeller/yeni"
          className="rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
        >
          + Yeni Model
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Marka</th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-600">{m.brand.name}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{m.name}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/modeller/${m.id}`} className="text-brand-700 hover:underline">
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
