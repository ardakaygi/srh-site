import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_MAP, POPULAR_BRAND_SLUGS } from "@/lib/brandLogos";
import type { BrandView } from "@/lib/data";
import { ilMarkaSlug } from "@/lib/slugs";

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-600">
      <path
        fillRule="evenodd"
        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function BrandsShowcase({ brands }: { brands: BrandView[] }) {
  const bySlug = new Map(brands.map((b) => [b.slug, b]));
  const popularBrands = POPULAR_BRAND_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (b): b is BrandView => Boolean(b),
  );
  const popularSlugSet = new Set(POPULAR_BRAND_SLUGS);
  const otherBrands = brands.filter((b) => !popularSlugSet.has(b.slug));

  return (
    <section className="bg-slate-50 px-4 py-14">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-slate-100/60 p-3 sm:p-4">
        <div className="grid gap-3 lg:grid-cols-2 sm:gap-4">
          {/* Left: popular brands with real logos */}
          <div className="rounded-2xl bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Marka Ayrımı Yapmadan Aynı Uzmanlık
            </h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Hangi markaya ve modele sahip olursanız olun, arıza tespitinden
              batarya yenilemeye kadar tüm teknik servis sürecini kendi
              merkezimizde, uzman kadromuzla yürütüyoruz.
            </p>

            <div className="mt-7 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Öne Çıkan Markalar
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  En çok servis verdiğimiz ve uzmanlaştığımız markalar
                </p>
              </div>
              <Link
                href="/markalar"
                className="hidden shrink-0 items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100 sm:inline-flex"
              >
                Tüm Markaları Gör
                <ChevronIcon />
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {popularBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/${ilMarkaSlug(brand.slug)}`}
                  className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 p-4 text-center transition-colors hover:border-brand-300 hover:shadow-sm"
                >
                  <span className="flex h-9 w-full items-center justify-center">
                    <Image
                      src={BRAND_LOGO_MAP[brand.slug]}
                      alt={brand.name}
                      width={100}
                      height={36}
                      className="max-h-9 w-auto object-contain"
                    />
                  </span>
                  <span className="text-xs font-semibold text-brand-700">Tamir Merkezi</span>
                </Link>
              ))}
            </div>

            <Link
              href="/markalar"
              className="mt-5 flex items-center justify-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100 sm:hidden"
            >
              Tüm Markaları Gör
              <ChevronIcon />
            </Link>
          </div>

          {/* Right: remaining brands as a text list */}
          <div className="rounded-2xl bg-white p-6 sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Diğer Markalar
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Destek verdiğimiz diğer markalardan bazıları
            </p>

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3">
              {otherBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/${ilMarkaSlug(brand.slug)}`}
                  className="flex items-center justify-between gap-1 text-sm font-medium text-slate-700 hover:text-brand-700"
                >
                  <span className="truncate">{brand.name}</span>
                  <ChevronIcon />
                </Link>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Listede olmayan bir markanız mı var?
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Bize ulaşın, destek sağlayalım.
                </p>
              </div>
              <Link
                href="/servis-talep"
                className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
              >
                Tüm Markalar
                <ChevronIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
