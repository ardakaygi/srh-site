import type { MetadataRoute } from "next";
import { getAllBrands, getAllModelsWithBrand, getAllProvinces } from "@/lib/data";
import { ilMarkaSlug, modelFullSlug } from "@/lib/slugs";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [provinces, brands, models] = await Promise.all([
    getAllProvinces(),
    getAllBrands(),
    getAllModelsWithBrand(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/markalar`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.siteUrl}/hizmet-bolgeleri`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.siteUrl}/servis-talep`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.siteUrl}/servis-takip`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.siteUrl}/atolye`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.siteUrl}/iletisim`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteConfig.siteUrl}/kvkk-aydinlatma-metni`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.siteUrl}/cerez-politikasi`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const provinceRoutes: MetadataRoute.Sitemap = provinces.map((p) => ({
    url: `${siteConfig.siteUrl}/${ilMarkaSlug(p.slug)}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const brandRoutes: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${siteConfig.siteUrl}/${ilMarkaSlug(b.slug)}`,
    lastModified: b.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const modelRoutes: MetadataRoute.Sitemap = models.map((m) => ({
    url: `${siteConfig.siteUrl}/model/${modelFullSlug(m.brand.slug, m.slug)}`,
    lastModified: m.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...provinceRoutes, ...brandRoutes, ...modelRoutes];
}
