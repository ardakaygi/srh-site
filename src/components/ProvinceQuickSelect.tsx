"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ilMarkaSlug } from "@/lib/slugs";

interface ProvinceOption {
  slug: string;
  name: string;
}

export function ProvinceQuickSelect({ provinces }: { provinces: ProvinceOption[] }) {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-slate-900">Cihazınızı göndermek çok kolay</h3>
      <p className="mt-1 text-sm text-slate-600">
        İlinizi seçin, o il için tahmini kargo süresini ve servis sayfasını
        hemen görün.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (slug) router.push(`/${ilMarkaSlug(slug)}`);
        }}
        className="mt-4 flex flex-col gap-2 sm:flex-row"
      >
        <label htmlFor="quick-province" className="sr-only">
          İl seçin
        </label>
        <select
          id="quick-province"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
        >
          <option value="">İl seçiniz…</option>
          {provinces.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!slug}
          className="rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Gönderim Bilgisini Gör
        </button>
      </form>
    </div>
  );
}
