import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TrustBadges } from "@/components/TrustBadges";
import { JsonLd } from "@/components/JsonLd";
import { getBrandsBySlugs, getNearbyProvinces, type ProvinceView } from "@/lib/data";
import { faqPageNode, localBusinessNode, serviceNode } from "@/lib/schema";
import { ilMarkaSlug } from "@/lib/slugs";

const processSteps = [
  "Servis talebi formunu doldurun, marka/model ve arızayı belirtin",
  "Size özel kargo kodu ile cihazınızı anlaşmalı kargoya teslim edin",
  "Merkezimize ulaşan cihazınıza ücretsiz arıza tespiti yapılır",
  "Onarım teklifini onayladığınızda tamir işlemine başlanır",
  "Test edilen cihazınız kargo ile adresinize geri gönderilir",
];

export async function ProvincePageContent({
  province,
}: {
  province: ProvinceView;
}) {
  const [topBrands, nearbyProvinces] = await Promise.all([
    getBrandsBySlugs(province.topBrandSlugs),
    getNearbyProvinces(province.region, province.slug),
  ]);
  const landmark = province.landmarkImage
    ? { src: province.landmarkImage, alt: province.landmarkAlt ?? province.name }
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessNode(),
      serviceNode({
        name: `${province.name} Robot Süpürge Servisi`,
        description: `${province.name} ve çevresinde robot süpürge arıza tespiti, onarım ve batarya yenileme hizmeti.`,
        areaServed: province.name,
      }),
      faqPageNode(province.faq),
    ].filter(Boolean),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" },
          { label: province.name, href: `/${ilMarkaSlug(province.slug)}` },
        ]}
      />

      <div className={landmark ? "grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start" : undefined}>
        <div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            {province.name} Robot Süpürge Servisi
          </h1>
          <p className="mt-2 text-sm font-medium text-brand-700">
            Tahmini kargo/teslimat süresi: {province.leadTimeLabel}
          </p>
          <div className="mt-4">
            <TrustBadges />
          </div>

          <p className="mt-6 leading-relaxed text-slate-700">
            {province.regionalIntro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/servis-talep"
              className="rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
            >
              {province.name} İçin Servis Talebi Oluştur
            </Link>
          </div>
        </div>

        {landmark && (
          <div className="mt-4 lg:mt-4">
            <div className="overflow-hidden rounded-2xl shadow-md">
              <Image
                src={landmark.src}
                alt={landmark.alt}
                width={700}
                height={933}
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">Servis Süreci</h2>
        <ol className="mt-4 space-y-3">
          {processSteps.map((step, index) => (
            <li key={step} className="flex gap-3 text-slate-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {topBrands.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">
            {province.name}&apos;da En Çok Talep Edilen Markalar
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {topBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/${ilMarkaSlug(brand.slug)}`}
                className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 hover:border-brand-400 hover:text-brand-800"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {province.faq.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">
            Sık Sorulan Sorular
          </h2>
          <dl className="mt-4 space-y-4">
            {province.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold text-slate-800">
                  {item.question}
                </dt>
                <dd className="mt-1 text-slate-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {nearbyProvinces.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">
            Yakın Bölgelerde Hizmet Verdiğimiz İller
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {nearbyProvinces.map((p) => (
              <Link
                key={p.id}
                href={`/${ilMarkaSlug(p.slug)}`}
                className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-400 hover:text-brand-800"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
