import { prisma } from "@/lib/prisma";
import type { Brand, Model, Province } from "@prisma/client";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaultItem {
  title: string;
  description: string;
}

// --- Province ---

export interface ProvinceView extends Omit<Province, "topBrandSlugs" | "faqJson"> {
  topBrandSlugs: string[];
  faq: FaqItem[];
}

function toProvinceView(p: Province): ProvinceView {
  return {
    ...p,
    topBrandSlugs: JSON.parse(p.topBrandSlugs) as string[],
    faq: JSON.parse(p.faqJson) as FaqItem[],
  };
}

export async function getAllProvinces(): Promise<ProvinceView[]> {
  const rows = await prisma.province.findMany({ orderBy: { name: "asc" } });
  return rows.map(toProvinceView);
}

export async function getProvinceBySlug(
  slug: string,
): Promise<ProvinceView | null> {
  const row = await prisma.province.findUnique({ where: { slug } });
  return row ? toProvinceView(row) : null;
}

/** Provinces in the same region, excluding the given one — for internal linking. */
export async function getNearbyProvinces(
  region: string,
  excludeSlug: string,
  take = 3,
): Promise<ProvinceView[]> {
  const rows = await prisma.province.findMany({
    where: { region, slug: { not: excludeSlug } },
    take,
    orderBy: { name: "asc" },
  });
  return rows.map(toProvinceView);
}

// --- Brand ---

export interface BrandView extends Omit<Brand, "faultsJson" | "faqJson"> {
  faults: FaultItem[];
  faq: FaqItem[];
}

function toBrandView(b: Brand): BrandView {
  return {
    ...b,
    faults: JSON.parse(b.faultsJson) as FaultItem[],
    faq: JSON.parse(b.faqJson) as FaqItem[],
  };
}

export async function getAllBrands(): Promise<BrandView[]> {
  const rows = await prisma.brand.findMany({ orderBy: { name: "asc" } });
  return rows.map(toBrandView);
}

export async function getBrandBySlug(slug: string): Promise<BrandView | null> {
  const row = await prisma.brand.findUnique({ where: { slug } });
  return row ? toBrandView(row) : null;
}

export async function getBrandsBySlugs(slugs: string[]): Promise<BrandView[]> {
  const rows = await prisma.brand.findMany({ where: { slug: { in: slugs } } });
  return rows.map(toBrandView);
}

// --- Model ---

export interface ModelView extends Omit<Model, "commonIssues"> {
  commonIssues: FaultItem[];
  brand: Brand;
}

export async function getModelsByBrandSlug(
  brandSlug: string,
): Promise<ModelView[]> {
  const rows = await prisma.model.findMany({
    where: { brand: { slug: brandSlug } },
    include: { brand: true },
    orderBy: { name: "asc" },
  });
  return rows.map((m) => ({
    ...m,
    commonIssues: JSON.parse(m.commonIssues) as FaultItem[],
  }));
}

export async function getModelBySlugs(
  brandSlug: string,
  modelSlug: string,
): Promise<ModelView | null> {
  const row = await prisma.model.findFirst({
    where: { slug: modelSlug, brand: { slug: brandSlug } },
    include: { brand: true },
  });
  if (!row) return null;
  return { ...row, commonIssues: JSON.parse(row.commonIssues) as FaultItem[] };
}

export async function getAllModelsWithBrand(): Promise<ModelView[]> {
  const rows = await prisma.model.findMany({ include: { brand: true } });
  return rows.map((m) => ({
    ...m,
    commonIssues: JSON.parse(m.commonIssues) as FaultItem[],
  }));
}
