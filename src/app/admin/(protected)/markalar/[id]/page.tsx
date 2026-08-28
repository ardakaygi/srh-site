import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BrandForm } from "./BrandForm";
import { deleteBrandAction } from "../actions";

export default async function AdminBrandEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "yeni";

  const brand = isNew
    ? null
    : await prisma.brand.findUnique({ where: { id } });

  if (!isNew && !brand) notFound();

  const initial = {
    slug: brand?.slug ?? "",
    name: brand?.name ?? "",
    intro: brand?.intro ?? "",
    faults: brand
      ? (JSON.parse(brand.faultsJson) as { title: string; description: string }[]).map((f) => ({
          a: f.title,
          b: f.description,
        }))
      : [],
    faq: brand
      ? (JSON.parse(brand.faqJson) as { question: string; answer: string }[]).map((f) => ({
          a: f.question,
          b: f.answer,
        }))
      : [],
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/markalar" className="text-sm text-brand-700 hover:underline">
        ← Tüm markalar
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? "Yeni Marka" : brand!.name}
        </h1>
        {!isNew && (
          <form action={deleteBrandAction}>
            <input type="hidden" name="id" value={id} />
            <button
              type="submit"
              className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              Markayı Sil
            </button>
          </form>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <BrandForm id={id} initial={initial} />
      </div>
    </div>
  );
}
