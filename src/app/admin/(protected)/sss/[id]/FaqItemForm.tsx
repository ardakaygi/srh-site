"use client";

import { useActionState } from "react";
import { upsertFaqItemAction, type FaqFormState } from "../actions";

const initialState: FaqFormState = {};

export function FaqItemForm({
  id,
  initial,
}: {
  id: string;
  initial: { question: string; answer: string; sortOrder: number };
}) {
  const [state, formAction, isPending] = useActionState(upsertFaqItemAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={id} />

      <div>
        <label htmlFor="question" className="block text-sm font-medium text-slate-700">Soru *</label>
        <input
          id="question"
          name="question"
          defaultValue={initial.question}
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="answer" className="block text-sm font-medium text-slate-700">Cevap *</label>
        <textarea
          id="answer"
          name="answer"
          defaultValue={initial.answer}
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="sortOrder" className="block text-sm font-medium text-slate-700">Sıra Numarası</label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={initial.sortOrder}
          className="mt-1 w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
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
