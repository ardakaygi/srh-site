"use client";

import { useActionState } from "react";
import { RepeatablePairFields } from "../../RepeatablePairFields";
import { AVAILABLE_COVER_IMAGES } from "../coverImages";
import { upsertBlogPostAction, type BlogFormState } from "../actions";

const initialState: BlogFormState = {};

export function BlogPostForm({
  id,
  initial,
}: {
  id: string;
  initial: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    coverImage: string;
    publishedAt: string; // yyyy-mm-dd
    readMinutes: number;
    sections: { a: string; b: string }[];
  };
}) {
  const [state, formAction, isPending] = useActionState(upsertBlogPostAction, initialState);

  return (
    <form action={formAction} encType="multipart/form-data" className="space-y-6">
      <input type="hidden" name="id" value={id} />

      <div className="rounded-lg border border-slate-200 p-4">
        <label className="block text-sm font-medium text-slate-700">Kapak Görseli</label>
        <div className="mt-2 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- admin-only preview of an arbitrary uploaded path */}
          <img src={initial.coverImage} alt="" className="h-16 w-24 rounded object-cover" />
          <p className="text-xs text-slate-400">Mevcut kapak görseli</p>
        </div>
        <input
          type="file"
          name="coverImageFile"
          accept="image/png,image/jpeg,image/webp"
          className="mt-2 block text-sm"
        />
        <p className="mt-1 text-xs text-slate-400">
          Yeni bir görsel yüklerseniz aşağıdaki hazır seçim yok sayılır.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">Başlık *</label>
          <input
            id="title"
            name="title"
            defaultValue={initial.title}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-slate-700">Slug *</label>
          <input
            id="slug"
            name="slug"
            defaultValue={initial.slug}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">Kategori *</label>
          <input
            id="category"
            name="category"
            defaultValue={initial.category}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-slate-700">
            Hazır Kapak Görseli <span className="font-normal text-slate-400">(yeni yüklemediyseniz)</span>
          </label>
          <select
            id="coverImage"
            name="coverImage"
            defaultValue={initial.coverImage}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {AVAILABLE_COVER_IMAGES.map((src) => (
              <option key={src} value={src}>{src.replace("/blog-covers/", "")}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="publishedAt" className="block text-sm font-medium text-slate-700">Yayın Tarihi *</label>
          <input
            id="publishedAt"
            name="publishedAt"
            type="date"
            defaultValue={initial.publishedAt}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="readMinutes" className="block text-sm font-medium text-slate-700">Okuma Süresi (dk)</label>
          <input
            id="readMinutes"
            name="readMinutes"
            type="number"
            defaultValue={initial.readMinutes}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700">Özet *</label>
        <textarea
          id="excerpt"
          name="excerpt"
          defaultValue={initial.excerpt}
          required
          rows={2}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-800">İçerik Bölümleri</h3>
        <div className="mt-2">
          <RepeatablePairFields
            name="sections"
            initialItems={initial.sections}
            aLabel="Alt başlık"
            bLabel="Paragraf"
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
