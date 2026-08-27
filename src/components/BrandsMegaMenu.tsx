"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BRAND_LOGO_MAP } from "@/lib/brandLogos";
import { ilMarkaSlug } from "@/lib/slugs";

interface BrandLite {
  slug: string;
  name: string;
}

export function BrandsMegaMenu({
  popularBrands,
  otherBrands,
}: {
  popularBrands: BrandLite[];
  otherBrands: BrandLite[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group leading-tight"
      >
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-brand-600">
          29 Markada Uzmanız
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold text-slate-800 group-hover:text-brand-700">
          Markalar
          <svg viewBox="0 0 20 20" fill="currentColor" className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}>
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[min(90vw,760px)] -translate-x-1/2 pt-3">
          <div className="grid grid-cols-3 gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Popüler Markalar
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {popularBrands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/${ilMarkaSlug(brand.slug)}`}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-100 p-3 text-center transition-colors hover:border-brand-200 hover:bg-brand-50"
                  >
                    <span className="flex h-8 w-full items-center justify-center">
                      <Image
                        src={BRAND_LOGO_MAP[brand.slug]}
                        alt={brand.name}
                        width={90}
                        height={32}
                        className="max-h-8 w-auto object-contain"
                      />
                    </span>
                    <span className="text-xs font-medium text-slate-600">{brand.name}</span>
                  </Link>
                ))}
              </div>
              <Link
                href="/markalar"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
              >
                Tüm Markaları Gör →
              </Link>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Diğer Markalar
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                {otherBrands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/${ilMarkaSlug(brand.slug)}`}
                    className="flex items-center justify-between text-sm font-medium text-slate-700 hover:text-brand-700"
                  >
                    {brand.name}
                    <span aria-hidden="true">›</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-brand-50 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
              </span>
              <h3 className="mt-3 font-bold text-slate-900">Marka Fark Etmeksizin Aynı Titizlik</h3>
              <p className="mt-1.5 text-sm text-slate-600">
                Hangi markaya sahip olursanız olun, arıza tespiti ve onarım
                sayfanıza tek tıkla ulaşın.
              </p>
              <Link
                href="/markalar"
                className="mt-4 block rounded-full bg-brand-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-brand-800"
              >
                Tüm Markaları Gör
              </Link>
              <p className="mt-3 text-xs text-slate-500">
                Markanızı listede göremediniz mi?{" "}
                <Link href="/servis-talep" className="font-semibold text-brand-700 hover:underline">
                  Yine de destek olabiliriz.
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
