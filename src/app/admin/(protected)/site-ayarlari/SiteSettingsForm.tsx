"use client";

import { useActionState } from "react";
import { SITE_SETTINGS_SCHEMA } from "@/lib/siteSettingsSchema";
import { updateSiteSettingsAction, type SiteSettingsFormState } from "./actions";

const initialState: SiteSettingsFormState = {};

export function SiteSettingsForm({
  values,
}: {
  values: Record<string, string>;
}) {
  const [state, formAction, isPending] = useActionState(updateSiteSettingsAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {Object.entries(SITE_SETTINGS_SCHEMA).map(([key, schema]) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-slate-700">
            {schema.label}
          </label>
          {schema.default.toString().includes("{businessName}") && (
            <p className="text-xs text-slate-400">
              {"{businessName}"} yazdığınız yerde işletme adı otomatik görünür.
            </p>
          )}
          {schema.isJson ? (
            <textarea
              id={key}
              name={key}
              defaultValue={values[key]}
              rows={5}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          ) : (
            <textarea
              id={key}
              name={key}
              defaultValue={values[key]}
              rows={2}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          )}
        </div>
      ))}

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
