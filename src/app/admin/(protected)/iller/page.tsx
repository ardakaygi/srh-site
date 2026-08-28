import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminProvincesPage() {
  const provinces = await prisma.province.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">İller</h1>
      <p className="mt-1 text-sm text-slate-500">
        {provinces.length} il. Sabit bir liste olduğu için yeni il eklenemez/silinemez, yalnızca
        düzenlenebilir.
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {provinces.map((p) => (
          <Link
            key={p.id}
            href={`/admin/iller/${p.id}`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm hover:border-brand-300 hover:shadow-sm"
          >
            <span className="font-medium text-slate-800">{p.name}</span>
            <span className="text-xs text-slate-400">{p.region}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
