import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { prisma } from "@/lib/prisma";
import { STATUS_LABELS, STATUS_ORDER } from "@/lib/status";
import { normalizePhone } from "@/lib/phone";

export const metadata: Metadata = {
  title: "Kargo / Servis Takip",
  description:
    "Servis talebinizin takip kodunu veya telefon numaranızı girerek cihazınızın onarım durumunu sorgulayın.",
};

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;
  return `${"*".repeat(digits.length - 4)}${digits.slice(-4)}`;
}

export default async function ServisTakipPage({
  searchParams,
}: {
  searchParams: Promise<{ kod?: string; tel?: string; ad?: string }>;
}) {
  const { kod, tel, ad } = await searchParams;

  // Security: a phone number alone is not a secret (unlike trackingCode, a
  // high-entropy server-generated value) - looking up personal repair data
  // by phone alone would let anyone who merely knows a customer's number
  // see their request. Requiring name + phone together as a second factor
  // keeps the "I lost my tracking code" path usable for the real customer
  // (who obviously knows both) while raising the bar for everyone else.
  const normalizedTel = tel ? normalizePhone(tel) : "";
  const nameQuery = ad?.trim().toLowerCase() ?? "";

  const results = kod
    ? await prisma.serviceRequest.findMany({
        where: { trackingCode: kod.trim().toUpperCase() },
        include: { brand: true, province: true, statusEvents: { orderBy: { createdAt: "asc" } } },
      })
    : normalizedTel && nameQuery
      ? (
          await prisma.serviceRequest.findMany({
            where: { customerPhone: normalizedTel },
            include: { brand: true, province: true, statusEvents: { orderBy: { createdAt: "asc" } } },
            orderBy: { createdAt: "desc" },
            take: 5,
          })
        ).filter((r) => r.customerName.trim().toLowerCase() === nameQuery)
      : [];

  const searched = Boolean(kod || (tel && ad));
  const phoneFormIncomplete = Boolean((tel || ad) && !(tel && ad));

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Kargo Takip", href: "/servis-takip" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Servis / Kargo Takip
      </h1>
      <p className="mt-2 text-slate-600">
        Servis talebi oluştururken size verilen takip kodunu veya kayıtlı
        telefon numaranızı girin.
      </p>

      <form method="get" className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="kod" className="sr-only">
          Takip kodu
        </label>
        <input
          id="kod"
          name="kod"
          type="text"
          placeholder="Takip kodu (ör. SRH-7K4P9QXA)"
          defaultValue={kod ?? ""}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
        />
        <button
          type="submit"
          className="rounded-full bg-emerald-700 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Sorgula
        </button>
      </form>
      <details className="mt-3 text-sm text-slate-600">
        <summary className="cursor-pointer">Takip kodum yok, telefon numaramla arayayım</summary>
        <p className="mt-2 text-xs text-slate-500">
          Güvenliğiniz için ad soyad ve telefon numaranızın birlikte
          eşleşmesi gerekir.
        </p>
        <form method="get" className="mt-3 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="ad" className="sr-only">
            Ad Soyad
          </label>
          <input
            id="ad"
            name="ad"
            type="text"
            placeholder="Ad Soyad"
            defaultValue={ad ?? ""}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
          />
          <label htmlFor="tel" className="sr-only">
            Telefon numarası
          </label>
          <input
            id="tel"
            name="tel"
            type="tel"
            placeholder="05XX XXX XX XX"
            defaultValue={tel ?? ""}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
          />
          <button
            type="submit"
            className="rounded-full border border-emerald-700 px-6 py-2 text-sm font-semibold text-emerald-800"
          >
            Sorgula
          </button>
        </form>
      </details>

      {phoneFormIncomplete && (
        <p className="mt-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          Telefonla sorgulamak için hem ad soyad hem de telefon numarasını
          girmeniz gerekir.
        </p>
      )}

      {searched && results.length === 0 && (
        <p className="mt-8 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
          Girdiğiniz bilgilerle eşleşen bir servis talebi bulunamadı. Kodu
          veya numarayı kontrol edip tekrar deneyin.
        </p>
      )}

      <div className="mt-8 space-y-8">
        {results.map((r) => {
          const currentIndex = STATUS_ORDER.indexOf(r.status);
          return (
            <div key={r.id} className="rounded-xl border border-slate-200 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-sm font-semibold text-slate-700">
                  {r.trackingCode}
                </p>
                <p className="text-sm text-slate-500">
                  {r.brand.name} · {r.province.name} · {maskPhone(r.customerPhone)}
                </p>
              </div>

              <ol className="mt-5 space-y-3">
                {STATUS_ORDER.map((status, index) => {
                  const done = index <= currentIndex;
                  const event = r.statusEvents.find((e) => e.status === status);
                  return (
                    <li key={status} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          done ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className={`text-sm font-medium ${done ? "text-slate-900" : "text-slate-400"}`}>
                          {STATUS_LABELS[status]}
                        </p>
                        {event?.note && (
                          <p className="text-xs text-slate-500">{event.note}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>

              {r.carrierTrackingUrl && (
                <a
                  href={r.carrierTrackingUrl}
                  className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Kargo firması takip sayfası →
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
