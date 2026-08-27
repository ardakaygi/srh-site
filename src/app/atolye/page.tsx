import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Atölyemiz",
  description:
    "Samsun'daki teknik atölyemizde mikro lehim seviyesinde anakart onarımı, LiDAR sensör kalibrasyonu ve özel spot kaynaklı batarya paketi üretimi yapıyoruz.",
};

const capabilities = [
  {
    title: "Mikro Lehim / Anakart Onarımı",
    description:
      "Robot süpürgenizin anakartındaki elektronik arızaları, hassas mikro lehim ekipmanlarıyla bileşen seviyesinde onarıyoruz.",
  },
  {
    title: "LiDAR Sensör Kalibrasyonu",
    description:
      "Navigasyon ve haritalama sorunlarının en sık nedeni olan LiDAR sensörlerinde fiziksel hizalama, motor arızası ve toz temizliği kaynaklı sorunları tespit edip gideriyoruz.",
  },
  {
    title: "Özel Spot Kaynaklı Batarya Paketi Üretimi",
    description:
      "Batarya paketlerini lehim değil, nikel şerit spot kaynak yöntemiyle üretiyoruz — hücreleri ısıyla zayıflatmayan, güvenlik standartlarına uygun profesyonel yöntem budur.",
  },
];

export default function AtolyePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Atölyemiz", href: "/atolye" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Samsun Teknik Atölyemiz
      </h1>
      <p className="mt-4 leading-relaxed text-slate-700">
        Samsun&apos;daki merkez atölyemizde, robot süpürgelerin en karmaşık
        arızalarını bile çözebilecek donanım ve uzmanlığa sahibiz. Basit
        sensör temizliğinden mikro lehim seviyesinde anakart onarımına kadar
        tüm işlemler kendi atölyemizde, kalifiye teknisyenler tarafından
        yapılır.
      </p>

      <div className="mt-8 space-y-6">
        {capabilities.map((c) => (
          <div key={c.title} className="rounded-xl border border-slate-200 p-5">
            <h2 className="text-lg font-semibold text-slate-900">{c.title}</h2>
            <p className="mt-2 text-slate-600">{c.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/servis-talep"
          className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Servis Talebi Oluştur
        </Link>
      </div>
    </div>
  );
}
