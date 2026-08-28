import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ModelForm } from "./ModelForm";
import { deleteModelAction } from "../actions";

export default async function AdminModelEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "yeni";

  const [model, brands] = await Promise.all([
    isNew ? null : prisma.model.findUnique({ where: { id } }),
    prisma.brand.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  if (!isNew && !model) notFound();

  const initial = {
    brandId: model?.brandId ?? "",
    slug: model?.slug ?? "",
    name: model?.name ?? "",
    partsNote: model?.partsNote ?? "",
    suctionPa: model?.suctionPa ?? null,
    batteryMah: model?.batteryMah ?? null,
    runtimeMin: model?.runtimeMin ?? null,
    commonIssues: model
      ? (JSON.parse(model.commonIssues) as { title: string; description: string }[]).map((f) => ({
          a: f.title,
          b: f.description,
        }))
      : [],
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/modeller" className="text-sm text-brand-700 hover:underline">
        ← Tüm modeller
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          {isNew ? "Yeni Model" : model!.name}
        </h1>
        {!isNew && (
          <form action={deleteModelAction}>
            <input type="hidden" name="id" value={id} />
            <button
              type="submit"
              className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              Modeli Sil
            </button>
          </form>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <ModelForm id={id} brands={brands} initial={initial} />
      </div>
    </div>
  );
}
