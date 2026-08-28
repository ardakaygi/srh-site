"use client";

import { useActionState } from "react";
import { RepeatablePairFields } from "../../RepeatablePairFields";
import { upsertModelAction, type ModelFormState } from "../actions";

const initialState: ModelFormState = {};

export function ModelForm({
  id,
  brands,
  initial,
}: {
  id: string;
  brands: { id: string; name: string }[];
  initial: {
    brandId: string;
    slug: string;
    name: string;
    partsNote: string;
    suctionPa: number | null;
    batteryMah: number | null;
    runtimeMin: number | null;
    commonIssues: { a: string; b: string }[];
  };
}) {
  const [state, formAction, isPending] = useActionState(upsertModelAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={id} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="brandId" className="block text-sm font-medium text-slate-700">Marka *</label>
          <select
            id="brandId"
            name="brandId"
            defaultValue={initial.brandId}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Marka seçin…</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">Model Adı *</label>
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
            Slug * <span className="font-normal text-slate-400">(markada tekil)</span>
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

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="suctionPa" className="block text-sm font-medium text-slate-700">Emiş Gücü (Pa)</label>
          <input
            id="suctionPa"
            name="suctionPa"
            type="number"
            defaultValue={initial.suctionPa ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="batteryMah" className="block text-sm font-medium text-slate-700">Batarya (mAh)</label>
          <input
            id="batteryMah"
            name="batteryMah"
            type="number"
            defaultValue={initial.batteryMah ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="runtimeMin" className="block text-sm font-medium text-slate-700">Çalışma Süresi (dk)</label>
          <input
            id="runtimeMin"
            name="runtimeMin"
            type="number"
            defaultValue={initial.runtimeMin ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="partsNote" className="block text-sm font-medium text-slate-700">Yedek Parça Notu</label>
        <textarea
          id="partsNote"
          name="partsNote"
          defaultValue={initial.partsNote}
          rows={2}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-800">Modele Özgü Arızalar</h3>
        <div className="mt-2">
          <RepeatablePairFields
            name="commonIssues"
            initialItems={initial.commonIssues}
            aLabel="Arıza başlığı"
            bLabel="Açıklama"
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
