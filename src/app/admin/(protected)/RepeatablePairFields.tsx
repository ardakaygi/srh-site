"use client";

import { useState } from "react";

export interface PairItem {
  a: string;
  b: string;
}

/**
 * Shared editor for the {title,description}[]/{question,answer}[] JSON
 * blobs used across Brand.faultsJson/faqJson, Model.commonIssues, etc.
 * Keeps local array state and mirrors it into a hidden JSON input so a
 * normal <form action={serverAction}> submit carries the whole list.
 */
export function RepeatablePairFields({
  name,
  initialItems,
  aLabel,
  bLabel,
}: {
  name: string;
  initialItems: PairItem[];
  aLabel: string;
  bLabel: string;
}) {
  const [items, setItems] = useState<PairItem[]>(
    initialItems.length > 0 ? initialItems : [{ a: "", b: "" }],
  );

  function update(index: number, field: "a" | "b", value: string) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  function addItem() {
    setItems((prev) => [...prev, { a: "", b: "" }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(items.filter((i) => i.a.trim()))} />
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 rounded-lg border border-slate-200 p-3 sm:flex-row">
          <div className="flex-1 space-y-1">
            <input
              value={item.a}
              onChange={(e) => update(index, "a", e.target.value)}
              placeholder={aLabel}
              className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm"
            />
            <textarea
              value={item.b}
              onChange={(e) => update(index, "b", e.target.value)}
              placeholder={bLabel}
              rows={2}
              className="w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="self-start rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500 hover:border-red-300 hover:text-red-600 sm:self-center"
          >
            Kaldır
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="rounded-full border border-brand-300 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50"
      >
        + Satır Ekle
      </button>
    </div>
  );
}
