import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { getAllBrands, getAllModelsWithBrand, getAllProvinces } from "@/lib/data";

export const metadata: Metadata = {
  title: "Servis Talebi Oluştur",
  description:
    "Robot süpürgeniz için ücretsiz arıza tespiti talebinde bulunun. Marka, model ve arıza bilgilerinizi paylaşın, size özel kargo kodu ile cihazınızı gönderin.",
};

export default async function ServisTalepPage() {
  // Single bulk fetch + in-memory grouping instead of one query per brand -
  // matters once the catalog reaches the 70+ brands MASTER_PROMPT.md targets.
  const [brands, provinces, allModels] = await Promise.all([
    getAllBrands(),
    getAllProvinces(),
    getAllModelsWithBrand(),
  ]);

  const brandsWithModels = brands.map((b) => ({
    id: b.id,
    name: b.name,
    faults: b.faults.slice(0, 6),
    models: allModels
      .filter((m) => m.brandId === b.id)
      .map((m) => ({ id: m.id, name: m.name, commonIssues: m.commonIssues })),
  }));

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Servis Talebi", href: "/servis-talep" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Servis Talebi Oluştur
      </h1>
      <p className="mt-2 text-slate-600">
        Cihazınızın bilgilerini paylaşın; onayınızdan sonra size özel kargo
        kodu ile gönderim talimatlarını iletelim.
      </p>

      <div className="mt-8">
        <ServiceRequestForm
          brands={brandsWithModels}
          provinces={provinces.map((p) => ({ id: p.id, name: p.name }))}
        />
      </div>
    </div>
  );
}
