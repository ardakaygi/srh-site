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
    logoUrl: string | null;
    faults: { a: string; b: string }[];
    faq: { a: string; b: string }[];
  };
}) {
  const [state, formAction, isPending] = useActionState(upsertBrandAction, initialState);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-6">
      <input type="hidden" name="id" value={id} />

      <div>
        <label className="block text-sm font-medium text-slate-700">Marka Logosu</label>
        {initial.logoUrl && (
          <div className="mt-2 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- admin-only preview of an arbitrary uploaded path, next/image's static import checks don't apply */}
            <img src={initial.logoUrl} alt="" className="h-10 w-auto rounded border border-slate-200 bg-white p-1" />
            <label className="flex items-center gap-1.5 text-xs text-slate-500">
              <input type="checkbox" name="removeLogo" className="h-3.5 w-3.5" />
              Logoyu kaldır
            </label>
          </div>
        )}
        <input
          type="file"
          name="logo"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="mt-2 block text-sm"
        />
        <p className="mt-1 text-xs text-slate-400">
          Yüklerseniz mevcut logonun yerine geçer. Boş bırakırsanız mevcut logo (varsa) korunur.
        </p>
      </div>

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
