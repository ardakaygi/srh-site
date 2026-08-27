import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import type { ModelView } from "@/lib/data";
import { localBusinessNode, serviceNode } from "@/lib/schema";
import { ilMarkaSlug, modelFullSlug } from "@/lib/slugs";

export function ModelPageContent({ model }: { model: ModelView }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessNode(),
      serviceNode({
        name: `${model.name} Servisi`,
        description: `${model.name} için arıza tespiti, yedek parça ve batarya yenileme hizmeti.`,
      }),
    ],
  };

  const specs = [
    model.suctionPa ? { label: "Emiş Gücü", value: `${model.suctionPa} Pa` } : null,
    model.batteryMah ? { label: "Batarya", value: `${model.batteryMah} mAh` } : null,
    model.runtimeMin ? { label: "Çalışma Süresi", value: `${model.runtimeMin} dk` } : null,
  ].filter((s): s is { label: string; value: string } => s !== null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: model.brand.name, href: `/${ilMarkaSlug(model.brand.slug)}` },
          { label: model.name, href: `/model/${modelFullSlug(model.brand.slug, model.slug)}` },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        {model.name} Servisi
      </h1>

      {specs.length > 0 && (
        <dl className="mt-6 grid grid-cols-3 gap-3">
          {specs.map((spec) => (
            <div key={spec.label} className="rounded-lg bg-slate-50 p-3 text-center">
              <dt className="text-xs text-slate-500">{spec.label}</dt>
              <dd className="mt-1 font-semibold text-slate-900">{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-8">
        <Link
          href="/servis-talep"
          className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          {model.name} İçin Servis Talebi Oluştur
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          {model.name}&apos;a Özgü Yaygın Sorunlar
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {model.commonIssues.map((issue) => (
            <div key={issue.title} className="rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900">{issue.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{issue.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">
          Batarya ve Yedek Parça
        </h2>
        <p className="mt-2 text-slate-700">{model.partsNote}</p>
      </section>

      <section className="mt-12">
        <Link
          href={`/${ilMarkaSlug(model.brand.slug)}`}
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← {model.brand.name} marka sayfasına dön
        </Link>
      </section>
    </div>
  );
}
