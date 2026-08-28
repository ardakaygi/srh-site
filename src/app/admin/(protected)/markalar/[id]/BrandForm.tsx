"use client";

import { useActionState } from "react";
import { RepeatablePairFields } from "../../RepeatablePairFields";
import { upsertBrandAction, type BrandFormState } from "../actions";

const initialState: BrandFormState = {};

export function BrandForm({
  id,
  initial,
}: {
  id: string;
  initial: {
    slug: string;
    name: string;
    intro: string;
    faults: { a: string; b: string }[];
    faq: { a: string; b: string }[];
  };
}) {
  const [state, formAction, isPending] = useActionState(upsertBrandAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={id} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">İsim *</label>
          <input
            id="name"
            name="name"
            defaultValue={initial.name}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-slate-700">
            Slug * <span className="font-normal text-slate-400">(küçük harf, tire)</span>
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={initial.slug}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </div>
      </div>

      <div>
        <label htmlFor="intro" className="block text-sm font-medium text-slate-700">
          Tanıtım Metni *
        </label>
        <textarea
          id="intro"
          name="intro"
          defaultValue={initial.intro}
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-800">Sık Görülen Arızalar</h3>
        <div className="mt-2">
          <RepeatablePairFields
            name="faults"
            initialItems={initial.faults}
            aLabel="Arıza başlığı"
            bLabel="Açıklama"
          />
        </div>
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
