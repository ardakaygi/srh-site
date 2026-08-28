import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getModelByFullSlug } from "@/lib/data";
import { ModelPageContent } from "@/components/pseo/ModelPageContent";

export const revalidate = 3600;

// No generateStaticParams here on purpose - see src/app/[slug]/page.tsx's
// comment (Prisma's native engine can't run reliably during `next build`
// on this host's container). Rendered on first request, then cached.

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
