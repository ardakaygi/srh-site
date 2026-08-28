import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { STATUS_LABELS } from "@/lib/status";
import { StatusUpdateForm } from "./StatusUpdateForm";

function formatDate(date: Date): string {
  return date.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
}

export default async function AdminServiceRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const request = await prisma.serviceRequest.findUnique({
    where: { id },
    include: {
      brand: true,
      province: true,
      statusEvents: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!request) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/servis-talepleri" className="text-sm text-brand-700 hover:underline">
        ← Tüm talepler
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          Talep <span className="font-mono">{request.trackingCode}</span>
        </h1>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
          {STATUS_LABELS[request.status]}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Müşteri
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div><dt className="text-slate-500">Ad Soyad</dt><dd className="font-medium text-slate-800">{request.customerName}</dd></div>
            <div><dt className="text-slate-500">Telefon</dt><dd className="font-medium text-slate-800">{request.customerPhone}</dd></div>
            <div><dt className="text-slate-500">İl</dt><dd className="font-medium text-slate-800">{request.province.name}</dd></div>
            <div><dt className="text-slate-500">Adres</dt><dd className="font-medium text-slate-800">{request.addressLine}</dd></div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Cihaz &amp; Arıza
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div><dt className="text-slate-500">Marka</dt><dd className="font-medium text-slate-800">{request.brand.name}</dd></div>
            {request.modelName && (
              <div><dt className="text-slate-500">Model</dt><dd className="font-medium text-slate-800">{request.modelName}</dd></div>
            )}
            <div>
              <dt className="text-slate-500">Arıza Açıklaması</dt>
              <dd className="font-medium text-slate-800 whitespace-pre-wrap">{request.faultDescription}</dd>
            </div>
            <div><dt className="text-slate-500">Oluşturulma</dt><dd className="font-medium text-slate-800">{formatDate(request.createdAt)}</dd></div>
            {request.carrierName && (
              <div><dt className="text-slate-500">Kargo</dt><dd className="font-medium text-slate-800">{request.carrierName}</dd></div>
            )}
          </dl>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Durum Güncelle
        </h2>
        <div className="mt-3">
          <StatusUpdateForm id={request.id} currentStatus={request.status} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Durum Geçmişi
        </h2>
        <ol className="mt-3 space-y-3">
          {request.statusEvents.map((event) => (
            <li key={event.id} className="flex items-start gap-3 text-sm">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
              <div>
                <p className="font-medium text-slate-800">
                  {STATUS_LABELS[event.status]}{" "}
                  <span className="font-normal text-slate-400">
                    · {formatDate(event.createdAt)}
                  </span>
                </p>
                {event.note && <p className="text-slate-600">{event.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
