import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustBadges } from "@/components/TrustBadges";
import { JsonLd } from "@/components/JsonLd";
import { getModelsByBrandSlug, type BrandView } from "@/lib/data";
import { faqPageNode, localBusinessNode, serviceNode } from "@/lib/schema";
import { ilMarkaSlug, modelFullSlug } from "@/lib/slugs";

const serviceBreakdown = [
  "Batarya Değişimi",
  "Sensör / LiDAR Tamiri",
  "Anakart Onarımı",
  "Motor Değişimi",
  "Yazılım Kontrolü",
  "Mop Sistemi Tamiri",
];

export async function BrandPageContent({ brand }: { brand: BrandView }) {
  const models = await getModelsByBrandSlug(brand.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessNode(),
      serviceNode({
        name: `${brand.name} Robot Süpürge Servisi`,
        description: brand.intro,
      }),
      faqPageNode(brand.faq),
    ].filter(Boolean),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Markalar", href: "/markalar" },
          { label: brand.name, href: `/${ilMarkaSlug(brand.slug)}` },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        {brand.name} Robot Süpürge Servisi
      </h1>
      <div className="mt-4">
        <TrustBadges />
      </div>
      <p className="mt-6 leading-relaxed text-slate-700">{brand.intro}</p>

      <div className="mt-8">
        <Link
          href="/servis-talep"
          className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
        >
          {brand.name} İçin Servis Talebi Oluştur
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          Sık Çözülen {brand.name} Arızaları
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {brand.faults.map((fault) => (
            <div key={fault.title} className="rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900">{fault.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{fault.description}</p>
            </div>
          ))}
        </div>
      </section>

      {models.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">
            {brand.name} Modelleri
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {models.map((model) => (
              <Link
                key={model.id}
                href={`/model/${modelFullSlug(brand.slug, model.slug)}`}
                className="rounded-xl border border-slate-200 p-4 hover:border-brand-400"
              >
                <p className="font-semibold text-slate-900">{model.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {[
                    model.suctionPa ? `${model.suctionPa} Pa` : null,
                    model.batteryMah ? `${model.batteryMah} mAh` : null,
                    model.runtimeMin ? `${model.runtimeMin} dk` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Hizmet Detayları</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {serviceBreakdown.map((s) => (
            <li
              key={s}
              className="rounded-lg bg-slate-50 px-3 py-2 text-center text-sm font-medium text-slate-700"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      {brand.faq.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">
            Sık Sorulan Sorular
          </h2>
          <dl className="mt-4 space-y-4">
            {brand.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-slate-800">{item.question}</dt>
                <dd className="mt-1 text-slate-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          {brand.name} Servisi Aldığımız Bölgeler
        </h2>
        <p className="mt-2 text-slate-600">
          {brand.name} robot süpürgeler için Türkiye&apos;nin 81 iline hizmet
          veriyoruz.
        </p>
        <Link
          href="/hizmet-bolgeleri"
          className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"
        >
          Tüm hizmet bölgelerini gör →
        </Link>
      </section>
    </div>
  );
}
