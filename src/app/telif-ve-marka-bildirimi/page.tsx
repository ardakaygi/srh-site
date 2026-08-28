import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllBrands, getAllProvinces } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Telif ve Marka Bildirimi",
  description: `${siteConfig.businessName} sitesinde kullanılan marka logoları, isimleri ve görsellerin kaynak/lisans bilgileri.`,
  robots: { index: false, follow: true },
};

// License/source detail for the 6 logos sourced and verified in this
// project's early sessions (public/brand-logos/ — see decisions.md). A
// brand with a logoUrl not listed here was added later via /admin/markalar;
// its license has not been independently verified by this codebase, which
// the fallback note below says plainly rather than implying it was checked.
const KNOWN_LOGO_NOTES: Record<string, React.ReactNode> = {
  roborock: "Metin ve basit şekilden oluşan logo, orijinallik eşiğinin altında kabul edilir; kaynak Wikimedia Commons.",
  xiaomi: "Metin ve basit şekilden oluşan logo, orijinallik eşiğinin altında kabul edilir; kaynak Wikimedia Commons.",
  samsung: "Metin ve basit şekilden oluşan logo, orijinallik eşiğinin altında kabul edilir; kaynak Wikimedia Commons.",
  irobot: "Metin ve basit şekilden oluşan logo, orijinallik eşiğinin altında kabul edilir; kaynak Wikimedia Commons.",
  ecovacs: "Metin ve basit şekilden oluşan logo, orijinallik eşiğinin altında kabul edilir; kaynak Wikimedia Commons.",
  dreame: (
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
};
const FALLBACK_LOGO_NOTE =
  "Bu logo yönetim panelinden yüklenmiştir; kaynak/lisans bilgisi bu sayfada henüz ayrıca belgelenmemiştir.";

// Every src here must correspond to a real, downloaded file in
// public/blog-covers/ — see decisions.md for the sourcing history.
const BLOG_COVER_CREDITS = [
  {
    src: "/blog-covers/charger.jpg",
    alt: "Şarj istasyonu önünde robot süpürge",
    credit: "Fotoğraf: Anastasiya Lvova · CC BY-SA 4.0",
  },
  {
    src: "/blog-covers/stuck.jpg",
    alt: "Bir eşyaya takılıp kalmış robot süpürge",
    credit: "Fotoğraf: BoldLuis · CC BY-SA 4.0",
  },
  {
    src: "/blog-covers/mop.jpg",
    alt: "Zeminde çalışan robot süpürge",
    credit: "Fotoğraf: Mamirobothk · CC BY-SA 3.0",
  },
  {
    src: "/blog-covers/brush.jpg",
    alt: "Robot süpürgenin alt kısmı ve fırçaları",
    credit: "Fotoğraf: Stimpack · CC0",
  },
  {
    src: "/blog-covers/navigation.jpg",
    alt: "Robot süpürgenin temizlik rotasını gösteren zaman atlamalı fotoğraf",
    credit: "Fotoğraf: Chris Bartle · CC BY 2.0",
  },
];

export default async function TelifVeMarkaBildirimiPage() {
  const [brands, provinces] = await Promise.all([getAllBrands(), getAllProvinces()]);
  const brandsWithLogo = brands.filter((b) => b.logoUrl);
  const textOnlyBrands = brands.filter((b) => !b.logoUrl);
  const provincesWithLandmark = provinces.filter((p) => p.landmarkImage);

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

        <h2>{siteConfig.businessName} Marka Başvurumuz</h2>
        <p>
          &quot;SRH Samsun Robot Hastanesi&quot; şekil + kelime markası,
          Türk Patent ve Marka Kurumu&apos;na {siteConfig.legalEntityName}{" "}
          unvanıyla, aşağıdaki bilgilerle başvurulmuştur. (Bu bir başvuru
          kaydıdır; nihai tescil belgesi netleştiğinde bu bölüm
          güncellenecektir. Başvuruya ait ücret, kimlik/iletişim bilgileri
          ve dekont numarası gizlilik nedeniyle bu sayfada paylaşılmamıştır.)
        </p>
        <div className="not-prose mt-4 flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center">
          <span className="flex h-16 w-32 shrink-0 items-center justify-center">
            <Image
              src="/logo.svg"
              alt="SRH Samsun Robot Hastanesi marka örneği"
              width={120}
              height={64}
              className="h-16 w-auto object-contain"
            />
          </span>
          <dl className="grid flex-1 grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-800">Başvuru Numarası</dt>
              <dd className="text-slate-600">2024/135167</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Başvuru Tarihi</dt>
              <dd className="text-slate-600">15.10.2024</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Marka Tipi</dt>
              <dd className="text-slate-600">Şekil + Kelime</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-slate-800">Marka Sınıfı</dt>
              <dd className="text-slate-600">
                (37-9) Sınai makinelerin ve cihazların, büro makinelerinin ve
                cihazlarının, haberleşme cihazlarının, elektrikli ve
                elektronik cihazların tesisi, bakımı ve tamiri hizmetleri.
              </dd>
            </div>
          </dl>
        </div>

        <h2>Marka Logoları</h2>
        <p>
          Aşağıdaki markaların logoları, sitede yalnızca &quot;bu markaya
          teknik servis veriyoruz&quot; bilgisini iletmek amacıyla (nominative
          fair use), marka sahipleriyle herhangi bir ortaklık, yetkili
          servislik veya iş birliği ilişkisi iddia edilmeden gösterilmektedir.
        </p>

        <ul className="not-prose mt-4 space-y-4">
          {brandsWithLogo.map((brand) => (
            <li
              key={brand.slug}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
            >
              <span className="flex h-9 w-28 shrink-0 items-center justify-center">
                <Image
                  src={brand.logoUrl!}
                  alt={brand.name}
                  width={100}
                  height={36}
                  className="h-9 w-auto object-contain"
                />
              </span>
              <p className="m-0 text-sm text-slate-600">
                {KNOWN_LOGO_NOTES[brand.slug] ?? FALLBACK_LOGO_NOTE}
              </p>
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

        <h2>İl Sayfası Fotoğrafları</h2>
        <p>
          Bazı il sayfalarında, o ile özgü gerçek bir simge yapı/anıt
          fotoğrafı gösterilmektedir (yönetim panelinden eklenebilir):
        </p>
        <ul className="not-prose mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          {provincesWithLandmark.map((p) => (
            <li key={p.slug} className="rounded-lg border border-slate-200 p-3">
              <span className="block font-semibold text-slate-800">
                {p.landmarkAlt ?? p.name}
              </span>
              {p.landmarkCredit ?? "Kaynak belirtilmemiş"}
            </li>
          ))}
        </ul>

        <h2>Blog Görselleri</h2>
        <p>
          Blog yazılarının kapak fotoğrafları, üzerlerinde düşük opaklıkta
          gösterilen logomuz dışında değiştirilmemiş, gerçek Wikimedia
          Commons fotoğraflarıdır:
        </p>
        <ul className="not-prose mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          {BLOG_COVER_CREDITS.map((c) => (
            <li key={c.src} className="rounded-lg border border-slate-200 p-3">
              <span className="block font-semibold text-slate-800">{c.alt}</span>
              {c.credit}
            </li>
          ))}
        </ul>

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
