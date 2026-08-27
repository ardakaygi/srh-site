import Link from "next/link";
import { TrustBadges } from "@/components/TrustBadges";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getAllBrands, getAllProvinces } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

const serviceCategories = [
  { title: "Batarya Değişimi", description: "Orijinal hücrelerle spot kaynaklı özel batarya paketi üretimi ve değişimi." },
  { title: "Anakart Onarımı", description: "Mikro lehim seviyesinde elektronik kart tamiri." },
  { title: "LiDAR Sensör Kalibrasyonu", description: "Haritalama ve navigasyon sensörlerinin bakımı, kalibrasyonu ve değişimi." },
  { title: "Haritalama Sorunları", description: "Robotun oda karıştırması, tekrar süpürmesi gibi navigasyon problemlerinin çözümü." },
  { title: "Şarj / Dock Sorunları", description: "Şarj istasyonuna gidememe, temas kaybı ve şarj devresi arızaları." },
  { title: "Motor Değişimi", description: "Fırça, tekerlek ve fan motorlarının tamiri ve değişimi." },
  { title: "Yazılım Güncelleme", description: "Firmware güncellemeleri ve uygulama bağlantı sorunlarının giderilmesi." },
  { title: "Mop / Su Sistemi", description: "Paspaslama pompası, su haznesi ve valf arızalarının onarımı." },
  { title: "Fan / Emiş Gücü", description: "Düşen emiş performansının kaynağının tespiti ve giderilmesi." },
  { title: "Toz Haznesi / Sensörler", description: "Toz haznesi dolu sensörü ve otomatik boşaltma istasyonu arızaları." },
  { title: "Wi-Fi ve Kamera Kalibrasyonu", description: "Bağlantı ve görüntü tabanlı navigasyon sensörü sorunları." },
];

export default async function HomePage() {
  const [brands, provinces] = await Promise.all([
    getAllBrands(),
    getAllProvinces(),
  ]);

  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-50 to-white px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Robot Süpürgeniz İçin Uzman Dokunuş
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Samsun merkezli atölyemizden Türkiye&apos;nin 81 iline; tüm robot
            süpürge markalarında arıza tespiti, onarım, yedek parça ve özel
            batarya yenileme hizmeti sunuyoruz.
          </p>
          <div className="mt-6">
            <TrustBadges />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/servis-talep"
              className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              Servis Talebi Oluştur
            </Link>
            <WhatsAppButton
              message="Merhaba, robot süpürgem için servis talebinde bulunmak istiyorum."
              className="rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
            >
              WhatsApp ile Destek Al
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold text-slate-900">
          Teknik Servis Kapsamımız
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-slate-200 p-5"
            >
              <h3 className="font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-1.5 text-sm text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Hizmet Verdiğimiz Markalar
            </h2>
            <Link
              href="/markalar"
              className="text-sm font-semibold text-emerald-700 hover:underline"
            >
              Tümünü Gör →
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/${brand.slug}-robot-supurge-servisi`}
                className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-800 transition-colors hover:border-emerald-400 hover:text-emerald-800"
              >
                {brand.name} Robot Süpürge Servisi
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Hizmet Bölgeleri
          </h2>
          <Link
            href="/hizmet-bolgeleri"
            className="text-sm font-semibold text-emerald-700 hover:underline"
          >
            81 İli Gör →
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {provinces.map((province) => (
            <Link
              key={province.id}
              href={`/${province.slug}-robot-supurge-servisi`}
              className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-800 transition-colors hover:border-emerald-400 hover:text-emerald-800"
            >
              {province.name} Robot Süpürge Servisi
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-emerald-800 px-4 py-14 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold">
            {siteConfig.businessName} Farkını Yaşayın
          </h2>
          <p className="mt-3 text-emerald-50">
            Cihazınızı adresinizden gönderin, ücretsiz arıza tespiti sonrası
            onayınızı alarak onarıma başlayalım.
          </p>
          <Link
            href="/servis-talep"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
          >
            Hemen Servis Talebi Oluştur
          </Link>
        </div>
      </section>
    </div>
  );
}
