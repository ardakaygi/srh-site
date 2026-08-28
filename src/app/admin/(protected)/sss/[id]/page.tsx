import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FaqItemForm } from "./FaqItemForm";
import { deleteFaqItemAction } from "../actions";

export default async function AdminFaqEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "yeni";

  const item = isNew ? null : await prisma.faqItem.findUnique({ where: { id } });
  if (!isNew && !item) notFound();

  const initial = {
    question: item?.question ?? "",
    answer: item?.answer ?? "",
    sortOrder: item?.sortOrder ?? 0,
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/sss" className="text-sm text-brand-700 hover:underline">
        ← Tüm sorular
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? "Yeni Soru" : "Soruyu Düzenle"}
        </h1>
        {!isNew && (
          <form action={deleteFaqItemAction}>
            <input type="hidden" name="id" value={id} />
            <button
              type="submit"
              className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              Sil
            </button>
          </form>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <FaqItemForm id={id} initial={initial} />
      </div>
    </div>
  );
}
