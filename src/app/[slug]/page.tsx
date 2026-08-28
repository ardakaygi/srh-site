import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBrandBySlug, getProvinceBySlug } from "@/lib/data";
import { stripIlMarkaSuffix, ilMarkaSlug } from "@/lib/slugs";
import { ProvincePageContent } from "@/components/pseo/ProvincePageContent";
import { BrandPageContent } from "@/components/pseo/BrandPageContent";

export const revalidate = 3600;

// No generateStaticParams here on purpose (2026-08-28): the production
// host's container can't reliably run Prisma's native query engine during
// `next build` (its Rust/tokio runtime panics with "timer has gone away"
// under the container's CPU throttling - see decisions.md). Pages render
// on first request instead and are then cached for `revalidate` seconds,
// same end result as ISR pre-rendering, just computed on-demand rather
// than at build time.

async function resolveEntity(slug: string) {
  const baseSlug = stripIlMarkaSuffix(slug);
  if (!baseSlug) return null;

  const province = await getProvinceBySlug(baseSlug);
  if (province) return { kind: "province" as const, province };

  const brand = await getBrandBySlug(baseSlug);
  if (brand) return { kind: "brand" as const, brand };

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entity = await resolveEntity(slug);
  if (!entity) return {};

  if (entity.kind === "province") {
    const { province } = entity;
    return {
      title: `${province.name} Robot Süpürge Servisi`,
      description: `${province.name} için robot süpürge arıza tespiti, onarım ve batarya yenileme hizmeti. Tahmini teslimat süresi: ${province.leadTimeLabel}.`,
      alternates: { canonical: `/${slug}` },
    };
  }

  const { brand } = entity;
  return {
    title: `${brand.name} Robot Süpürge Servisi`,
    description: brand.intro.slice(0, 155),
    alternates: { canonical: `/${slug}` },
  };
}

export default async function IlMarkaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entity = await resolveEntity(slug);
  if (!entity) notFound();

  if (entity.kind === "province") {
    return <ProvincePageContent province={entity.province} />;
  }

  return <BrandPageContent brand={entity.brand} />;
}
