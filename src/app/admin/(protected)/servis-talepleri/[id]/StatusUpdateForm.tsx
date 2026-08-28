"use client";

import { useActionState } from "react";
import { STATUS_LABELS, STATUS_ORDER } from "@/lib/status";
import { updateServiceRequestStatusAction, type UpdateStatusState } from "../actions";

const initialState: UpdateStatusState = {};

export function StatusUpdateForm({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [state, formAction, isPending] = useActionState(
    updateServiceRequestStatusAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="id" value={id} />

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-slate-700">
          Yeni Durum
        </label>
        <select
          id="status"
          name="status"
          defaultValue={currentStatus}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium text-slate-700">
          Not (müşteriye görünür, opsiyonel)
        </label>
        <textarea
          id="note"
          name="note"
          rows={2}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && <p className="text-sm text-green-600">Durum güncellendi.</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
      >
        {isPending ? "Kaydediliyor…" : "Durumu Güncelle"}
      </button>
    </form>
  );
}
