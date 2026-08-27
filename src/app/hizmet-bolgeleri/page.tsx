import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllProvinces } from "@/lib/data";
import { ilMarkaSlug } from "@/lib/slugs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hizmet Bölgeleri",
  description:
    "Samsun Robot Hastanesi'nin robot süpürge teknik servis hizmeti sunduğu iller.",
};

export default async function HizmetBolgeleriPage() {
  const provinces = await getAllProvinces();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Hizmet Bölgelerimiz
      </h1>
      <p className="mt-2 text-slate-600">
        Samsun&apos;daki merkezimizden Türkiye&apos;nin 81 iline anlaşmalı
        kargo ile hizmet veriyoruz. Aşağıda şu anda yayında olan il
        sayfalarını görebilirsiniz — kapsam kademeli olarak tüm illere
        genişletilmektedir.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {provinces.map((province) => (
          <Link
            key={province.id}
            href={`/${ilMarkaSlug(province.slug)}`}
            className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 hover:border-brand-400 hover:text-brand-800"
          >
            {province.name} Robot Süpürge Servisi
          </Link>
        ))}
      </div>
    </div>
  );
}
