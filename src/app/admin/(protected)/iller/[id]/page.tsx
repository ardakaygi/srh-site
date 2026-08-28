import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProvinceForm } from "./ProvinceForm";

export default async function AdminProvinceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const province = await prisma.province.findUnique({ where: { id } });
  if (!province) notFound();

  const initial = {
    leadTimeLabel: province.leadTimeLabel,
    regionalIntro: province.regionalIntro,
    topBrandSlugs: (JSON.parse(province.topBrandSlugs) as string[]).join(", "),
    landmarkImage: province.landmarkImage,
    landmarkAlt: province.landmarkAlt ?? "",
    landmarkCredit: province.landmarkCredit ?? "",
    faq: (JSON.parse(province.faqJson) as { question: string; answer: string }[]).map((f) => ({
      a: f.question,
      b: f.answer,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/iller" className="text-sm text-brand-700 hover:underline">
        ← Tüm iller
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">
        {province.name} <span className="text-base font-normal text-slate-400">({province.region})</span>
      </h1>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
        <ProvinceForm id={id} initial={initial} />
      </div>
    </div>
  );
}
