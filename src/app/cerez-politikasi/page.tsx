import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: `${siteConfig.businessName} çerez politikası.`,
  robots: { index: false, follow: true },
};

const cookies = [
  {
    name: "(zorunlu oturum çerezi — örnek)",
    purpose: "Sitenin temel işlevlerinin çalışması için gereklidir.",
    duration: "Oturum süresince",
    consentRequired: "Hayır",
  },
];

export default function CerezPolitikasiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Çerez Politikası", href: "/cerez-politikasi" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Çerez Politikası
      </h1>

      <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Taslak — yayın öncesi güncellenmelidir.</strong> Aşağıdaki
        tablo, siteye analitik (GA4/GTM) veya pazarlama çerezleri eklendiğinde
        her çerez için ad, amaç, süre ve sağlayıcı bilgisiyle güncellenmelidir.
        Zorunlu olmayan hiçbir çerez, kullanıcının açık rızası alınmadan
        ayarlanmamalıdır.
      </div>

      <p className="mt-6 text-slate-700">
        Bu site, temel işlevlerin çalışması için gerekli olan zorunlu
        çerezler dışında, açık rızanız olmadan analiz veya pazarlama amaçlı
        çerez kullanmaz.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 pr-4">Çerez</th>
              <th className="py-2 pr-4">Amaç</th>
              <th className="py-2 pr-4">Süre</th>
              <th className="py-2">Rıza Gerekli mi?</th>
            </tr>
          </thead>
          <tbody>
            {cookies.map((c) => (
              <tr key={c.name} className="border-b border-slate-100">
                <td className="py-2 pr-4">{c.name}</td>
                <td className="py-2 pr-4">{c.purpose}</td>
                <td className="py-2 pr-4">{c.duration}</td>
                <td className="py-2">{c.consentRequired}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
