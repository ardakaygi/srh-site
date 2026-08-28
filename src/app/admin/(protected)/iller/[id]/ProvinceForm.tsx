"use client";

import { useActionState } from "react";
import { RepeatablePairFields } from "../../RepeatablePairFields";
import { updateProvinceAction, type ProvinceFormState } from "../actions";

const initialState: ProvinceFormState = {};

export function ProvinceForm({
  id,
  initial,
}: {
  id: string;
  initial: {
    leadTimeLabel: string;
    regionalIntro: string;
    topBrandSlugs: string;
    faq: { a: string; b: string }[];
  };
}) {
  const [state, formAction, isPending] = useActionState(updateProvinceAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={id} />

      <div>
        <label htmlFor="leadTimeLabel" className="block text-sm font-medium text-slate-700">
          Tahmini Kargo/Teslimat Süresi *
        </label>
        <input
          id="leadTimeLabel"
          name="leadTimeLabel"
          defaultValue={initial.leadTimeLabel}
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="regionalIntro" className="block text-sm font-medium text-slate-700">
          Bölge Tanıtım Metni *
        </label>
        <textarea
          id="regionalIntro"
          name="regionalIntro"
          defaultValue={initial.regionalIntro}
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="topBrandSlugs" className="block text-sm font-medium text-slate-700">
          Öne Çıkan Marka Slug&apos;ları <span className="font-normal text-slate-400">(virgülle ayırın, örn. roborock, xiaomi, dreame)</span>
        </label>
        <input
          id="topBrandSlugs"
          name="topBrandSlugs"
          defaultValue={initial.topBrandSlugs}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-800">Sık Sorulan Sorular</h3>
        <div className="mt-2">
          <RepeatablePairFields
            name="faq"
            initialItems={initial.faq}
            aLabel="Soru"
            bLabel="Cevap"
          />
        </div>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="text-sm text-green-600">Kaydedildi.</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
      >
        {isPending ? "Kaydediliyor…" : "Kaydet"}
      </button>
    </form>
  );
}
