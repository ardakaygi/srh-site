import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BRAND_LOGO_MAP } from "@/lib/brandLogos";
import { getAllBrands } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Telif ve Marka Bildirimi",
  description: `${siteConfig.businessName} sitesinde kullanılan marka logoları, isimleri ve görsellerin kaynak/lisans bilgileri.`,
  robots: { index: false, follow: true },
};

// Per-brand license/source detail for the logos actually shown on the site.
// Every entry here must correspond to a real, downloaded file in
// public/brand-logos/ — see decisions.md for the sourcing history.
const logoCredits = [
  {
    slug: "roborock",
    name: "Roborock",
    note: "Metin ve basit şekilden oluşan logo, orijinallik eşiğinin altında kabul edilir; kaynak Wikimedia Commons.",
  },
  {
    slug: "xiaomi",
    name: "Xiaomi",
    note: "Metin ve basit şekilden oluşan logo, orijinallik eşiğinin altında kabul edilir; kaynak Wikimedia Commons.",
  },
  {
    slug: "samsung",
    name: "Samsung",
    note: "Metin ve basit şekilden oluşan logo, orijinallik eşiğinin altında kabul edilir; kaynak Wikimedia Commons.",
  },
  {
    slug: "irobot",
    name: "iRobot",
    note: "Metin ve basit şekilden oluşan logo, orijinallik eşiğinin altında kabul edilir; kaynak Wikimedia Commons.",
  },
  {
    slug: "ecovacs",
    name: "Ecovacs",
    note: "Metin ve basit şekilden oluşan logo, orijinallik eşiğinin altında kabul edilir; kaynak Wikimedia Commons.",
  },
  {
    slug: "dreame",
    name: "Dreame",
    note: (
      <>
        CC BY-SA 4.0 lisansı altında,{" "}
        <a
          href="https://commons.wikimedia.org/wiki/File:Logo_of_Dreame.svg"
          className="font-semibold text-brand-700 hover:underline"
        >
          Wikimedia Commons
        </a>{" "}
        üzerinden, Dreame Technology atfıyla kullanılmaktadır.
      </>
    ),
  },
];

export default async function TelifVeMarkaBildirimiPage() {
  const brands = await getAllBrands();
  const logoSlugSet = new Set(logoCredits.map((c) => c.slug));
  const textOnlyBrands = brands.filter((b) => !logoSlugSet.has(b.slug));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Telif ve Marka Bildirimi", href: "/telif-ve-marka-bildirimi" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Telif ve Marka Bildirimi
      </h1>

      <div className="prose prose-slate mt-6 max-w-none">
        <p>
          {siteConfig.businessName}, bağımsız bir robot süpürge tamir ve
          bakım servisidir. Sitede tanıtım ve bilgilendirme amacıyla üçüncü
          taraflara ait marka isimleri, logolar ve görseller kullanılmaktadır.
          Bu sayfa, bunların kaynak ve lisans bilgilerini tek bir yerde
          topluca listeler.
        </p>

        <h2>Marka Logoları</h2>
        <p>
          Aşağıdaki markaların logoları, sitede yalnızca &quot;bu markaya
          teknik servis veriyoruz&quot; bilgisini iletmek amacıyla (nominative
          fair use), marka sahipleriyle herhangi bir ortaklık, yetkili
          servislik veya iş birliği ilişkisi iddia edilmeden gösterilmektedir.
        </p>

        <ul className="not-prose mt-4 space-y-4">
          {logoCredits.map((credit) => (
            <li
              key={credit.slug}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
            >
              <span className="flex h-9 w-28 shrink-0 items-center justify-center">
                <Image
                  src={BRAND_LOGO_MAP[credit.slug]}
                  alt={credit.name}
                  width={100}
                  height={36}
                  className="max-h-9 w-auto object-contain"
                />
              </span>
              <p className="m-0 text-sm text-slate-600">{credit.note}</p>
            </li>
          ))}
        </ul>

        <h2>Sitede Adı Geçen Diğer Markalar</h2>
        <p>
          Aşağıdaki markaların isimleri, servis kapsamımızı belirtmek amacıyla
          düz metin olarak anılmaktadır; bu markalar için ayrıca bir logo
          kullanılmamaktadır ve isimlerin anılması marka sahipleriyle bir
          bağlantı iddiası taşımaz:
        </p>
        <p className="not-prose text-sm text-slate-600">
          {textOnlyBrands.map((b) => b.name).join(" · ")}
        </p>

        <h2>Türkiye Haritası</h2>
        <p>
          Hizmet bölgeleri bölümünde kullanılan Türkiye harita anahattı,{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Map_of_Turkey.svg"
            className="font-semibold text-brand-700 hover:underline"
          >
            Nevit Dilmen
          </a>{" "}
          tarafından hazırlanmış olup CC BY-SA 3.0 lisansı altında
          kullanılmaktadır.
        </p>

        <h2>Ürün Fotoğrafı</h2>
        <p>
          Ana sayfadaki robot süpürge fotoğrafı, Pexels üzerinden Andrey
          Matveev&apos;e ait standart ücretsiz lisans kapsamında
          kullanılmaktadır.
        </p>

        <h2>Genel Feragatname</h2>
        <p>
          Sitede görülen tüm marka isim ve logoları ilgili marka sahiplerine
          aittir. {siteConfig.businessName}, bu markaların hiçbiriyle resmi
          bağlantılı, yetkili servis veya iş ortağı değildir; markalar
          yalnızca hizmet verilen ürün gruplarının tanıtımı amacıyla
          anılmaktadır.
        </p>
      </div>
    </div>
  );
}
