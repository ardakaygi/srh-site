"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-8"
      >
        <h1 className="text-xl font-bold text-white">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-slate-400">Devam etmek için şifrenizi girin.</p>

        <label htmlFor="password" className="mt-6 block text-sm font-medium text-slate-300">
          Şifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-white outline-none focus:border-brand-500"
        />
        {state.error && <p className="mt-2 text-sm text-red-400">{state.error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {isPending ? "Giriş yapılıyor…" : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
