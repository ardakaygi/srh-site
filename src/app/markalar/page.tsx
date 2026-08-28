import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllBrands } from "@/lib/data";
import { ilMarkaSlug } from "@/lib/slugs";

// force-dynamic instead of ISR/revalidate - see src/app/page.tsx's comment.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tüm Markalar",
  description:
    "Samsun Robot Hastanesi'nin teknik servis hizmeti sunduğu tüm robot süpürge markaları.",
};

export default async function MarkalarPage() {
  const brands = await getAllBrands();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Markalar", href: "/markalar" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Hizmet Verdiğimiz Markalar
      </h1>
      <p className="mt-2 text-slate-600">
        Aşağıdaki markaların tüm modellerinde arıza tespiti, onarım ve batarya
        yenileme hizmeti veriyoruz.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/${ilMarkaSlug(brand.slug)}`}
            className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 hover:border-brand-400 hover:text-brand-800"
          >
            {brand.name} Robot Süpürge Servisi
          </Link>
        ))}
      </div>
    </div>
  );
}
