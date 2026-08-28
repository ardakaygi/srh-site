import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { STATUS_LABELS } from "@/lib/status";

export const dynamic = "force-dynamic";

const statusColors: Record<string, string> = {
  RECEIVED: "bg-slate-100 text-slate-700",
  DIAGNOSED: "bg-amber-100 text-amber-800",
  REPAIRING: "bg-blue-100 text-blue-800",
  TESTING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-teal-100 text-teal-800",
  DELIVERED: "bg-green-100 text-green-800",
};

function formatDate(date: Date): string {
  return date.toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" });
}

export default async function AdminServiceRequestsPage() {
  const requests = await prisma.serviceRequest.findMany({
    include: { brand: true, province: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Servis Talepleri</h1>
      <p className="mt-1 text-sm text-slate-500">
        Toplam {requests.length} talep, en yeniden eskiye sıralı.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Takip Kodu</th>
              <th className="px-4 py-3">Müşteri</th>
              <th className="px-4 py-3">Marka / Model</th>
              <th className="px-4 py-3">İl</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/servis-talepleri/${r.id}`}
                    className="font-mono text-xs font-semibold text-brand-700 hover:underline"
                  >
                    {r.trackingCode}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-800">{r.customerName}</p>
                  <p className="text-xs text-slate-500">{r.customerPhone}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-slate-700">{r.brand.name}</p>
                  {r.modelName && <p className="text-xs text-slate-500">{r.modelName}</p>}
                </td>
                <td className="px-4 py-3 text-slate-700">{r.province.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[r.status]}`}
                  >
                    {STATUS_LABELS[r.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">{formatDate(r.createdAt)}</td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                  Henüz servis talebi yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
