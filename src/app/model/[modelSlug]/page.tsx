import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllModelsWithBrand, getModelByFullSlug } from "@/lib/data";
import { modelFullSlug } from "@/lib/slugs";
import { ModelPageContent } from "@/components/pseo/ModelPageContent";

export const revalidate = 3600;

export async function generateStaticParams() {
  const models = await getAllModelsWithBrand();
  return models.map((m) => ({
    modelSlug: modelFullSlug(m.brand.slug, m.slug),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ modelSlug: string }>;
}): Promise<Metadata> {
  const { modelSlug } = await params;
  const model = await getModelByFullSlug(modelSlug);
  if (!model) return {};

  return {
    title: `${model.name} Servisi`,
    description: `${model.name} için arıza tespiti, orijinal yedek parça ve batarya yenileme hizmeti.`,
    alternates: { canonical: `/model/${modelSlug}` },
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ modelSlug: string }>;
}) {
  const { modelSlug } = await params;
  const model = await getModelByFullSlug(modelSlug);
  if (!model) notFound();

  return <ModelPageContent model={model} />;
}
