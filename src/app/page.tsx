import Image from "next/image";
import Link from "next/link";
import { BrandsShowcase } from "@/components/BrandsShowcase";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { ProvinceQuickSelect } from "@/components/ProvinceQuickSelect";
import { ServiceCoverageMap } from "@/components/ServiceCoverageMap";
import { ServiceProcessSection } from "@/components/ServiceProcessSection";
import { TestCalibrationSection } from "@/components/TestCalibrationSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getAllBrands, getAllProvinces } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import {
  BatteryIcon,
  CameraIcon,
  ChipIcon,
  DockIcon,
  DropletIcon,
  FanIcon,
  HeadsetIcon,
  MapIcon,
  MonitorIcon,
  RadarIcon,
  ShieldCheckIcon,
  TrayIcon,
  TruckIcon,
  UserGroupIcon,
  WheelIcon,
  WifiIcon,
} from "@/components/ServiceIcons";

const coverageFeatures = [
  { label: "Uzman Teknik Kadro", Icon: UserGroupIcon },
  { label: "Türkiye Geneli Kargo", Icon: TruckIcon },
  { label: "7/24 Destek Hattı", Icon: HeadsetIcon },
  { label: "Garantili Servis", Icon: ShieldCheckIcon },
];

const coverageChecklist = [
  "Samsun Merkezli Uzman Servis",
  "81 İlde Anlaşmalı Kargo",
  "Ücretsiz Gönderim Kodu",
  "Onarım Sonrası Güvenli Teslim",
];

export const revalidate = 3600;

const heroChecklist = ["Orijinal Yedek Parça", "Uzman Teknik Ekip", siteConfig.warrantyLabel];

const rotatingFaults = [
  "Şarj Almıyorsa",
  "LiDAR Hatası Veriyorsa",
  "Haritalama Yapmıyorsa",
  "Mop Çalışmıyorsa",
  "Bağlantı Kurmuyorsa",
];

const heroCallouts = [
  {
    title: "Ücretsiz Arıza Tespiti",
    description: "Cihazınızı gönderin, ücretsiz arıza tespiti yapalım.",
    className: "right-0 top-2 lg:right-[-1rem]",
  },
  {
    title: "Hızlı & Güvenli Servis",
    description: "Uzman teknisyenlerimizle güvenli ellerdesiniz.",
    className: "left-0 top-1/2 -translate-y-1/2 lg:left-[-2rem]",
  },
  {
    title: siteConfig.warrantyLabel,
    description: "Yaptığımız tüm onarım ve batarya değişimleri garanti kapsamındadır.",
    className: "right-4 bottom-0 lg:right-[-0.5rem]",
  },
];

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`shrink-0 text-brand-600 ${className}`}>
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-brand-600">
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const serviceCategories = [
  {
    title: "Şarj & Dock Sorunları",
    description: "Cihaz dock'a ulaşamıyor veya şarj olmuyorsa devreyi ve temas noktalarını onarıyoruz.",
    bullets: ["Şarj pini temizliği", "Devre kartı kontrolü", "Dock hizalama testi"],
    Icon: DockIcon,
  },
  {
    title: "LiDAR Sensör Tamiri",
    description: "Döner kule arızalarında ve harita bozulmalarında lazer sensörünü elden geçiriyoruz.",
    bullets: ["Motor/kule değişimi", "Lens temizliği", "Kalibrasyon testi"],
    Icon: RadarIcon,
  },
  {
    title: "Haritalama Problemleri",
    description: "Oda karıştırma ve tekrarlı süpürme gibi navigasyon hatalarını gideriyoruz.",
    bullets: ["Harita sıfırlama", "Sensör senkronizasyonu", "Yazılım güncelleme"],
    Icon: MapIcon,
  },
  {
    title: "Anakart Onarımı",
    description: "Elektronik kart arızalarını bileşen seviyesinde mikro lehimle onarıyoruz.",
    bullets: ["Kart tanı testi", "Bileşen değişimi", "Fonksiyon kontrolü"],
    Icon: ChipIcon,
  },
  {
    title: "Tekerlek & Motor",
    description: "Hareket etmeyen veya sıkışan tekerlek/motor gruplarını yeniliyoruz.",
    bullets: ["Motor değişimi", "Dişli/tahrik kontrolü", "Hareket testi"],
    Icon: WheelIcon,
  },
  {
    title: "Batarya Değişimi",
    description: "Orijinal hücrelerle spot kaynaklı özel batarya paketi üretip takıyoruz.",
    bullets: ["Hücre testi", "Spot kaynak montaj", "Şarj kapasite ölçümü"],
    Icon: BatteryIcon,
  },
  {
    title: "Mop & Su Sistemi",
    description: "Paspaslama pompası ve su haznesindeki tıkanıklık/sızıntıları onarıyoruz.",
    bullets: ["Pompa/valf değişimi", "Hazne sızdırmazlık", "Akış testi"],
    Icon: DropletIcon,
  },
  {
    title: "Fan & Emiş Sorunları",
    description: "Düşen emiş gücünün kaynağını bulup fan ve hava kanalını temizliyoruz.",
    bullets: ["Fan motoru kontrolü", "Kanal temizliği", "Emiş gücü ölçümü"],
    Icon: FanIcon,
  },
  {
    title: "Yazılım Güncelleme",
    description: "Firmware ve uygulama bağlantı sorunlarını güncel yazılımla gideriyoruz.",
    bullets: ["Firmware güncelleme", "Uygulama eşleştirme", "Ayar sıfırlama"],
    Icon: MonitorIcon,
  },
  {
    title: "Toz Haznesi Arızaları",
    description: "Toz haznesi sensörü ve otomatik boşaltma istasyonu arızalarına bakıyoruz.",
    bullets: ["Sensör değişimi", "İstasyon hortum kontrolü", "Mekanizma testi"],
    Icon: TrayIcon,
  },
  {
    title: "Wi-Fi Bağlantı Sorunları",
    description: "Uygulamaya bağlanamayan cihazlarda ağ modülünü kontrol edip onarıyoruz.",
    bullets: ["Modül testi", "Ağ eşleştirme", "Sinyal ölçümü"],
    Icon: WifiIcon,
  },
  {
    title: "Kamera / Sensör Kalibrasyonu",
    description: "Görüntü tabanlı navigasyon ve çarpışma sensörlerini kalibre ediyoruz.",
    bullets: ["Lens temizliği", "Kalibrasyon", "Algılama testi"],
    Icon: CameraIcon,
  },
];

export default async function HomePage() {
  const [allBrands, allProvinces] = await Promise.all([
    getAllBrands(),
    getAllProvinces(),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:py-20">
        {/* Decorative gradient wash - purely visual, sits behind content */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-bl from-brand-50 via-white to-white lg:w-2/3" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div className="min-w-0 text-center lg:text-left">
            <span className="animate-fade-up inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-800">
              Samsun&apos;dan Türkiye&apos;nin 81 iline
            </span>

            <h1 className="animate-fade-up mt-5 max-w-full text-3xl font-extrabold leading-[1.2] tracking-tight text-slate-900 [animation-delay:100ms] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Robotunuz{" "}
              <span className="rotate-fade max-w-full align-bottom" aria-hidden="true">
                {rotatingFaults.map((phrase, i) => (
                  <span
                    key={phrase}
                    style={{ animationDelay: `${i * 4}s` }}
                    className="max-w-full bg-gradient-to-r from-brand-500 via-brand-700 to-brand-900 bg-clip-text text-transparent sm:whitespace-nowrap"
                  >
                    {phrase}
                  </span>
                ))}
              </span>
              <span className="sr-only">
                Şarj almıyorsa, LiDAR hatası veriyorsa, haritalama yapmıyorsa,
                mop çalışmıyorsa veya bağlantı kurmuyorsa
              </span>
              <br />
              Samsun Robot Hastanesi&apos;ne
            </h1>

            <p className="animate-fade-up mx-auto mt-5 max-w-md text-lg text-slate-600 [animation-delay:200ms] lg:mx-0">
              Tüm marka ve modeller için arıza tespiti, onarım, yedek parça ve
              özel batarya yenileme hizmeti sunuyoruz.
            </p>

            <ul className="animate-fade-up mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 [animation-delay:300ms] lg:justify-start">
              {heroChecklist.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>

            <div className="animate-fade-up mt-8 flex flex-wrap justify-center gap-3 [animation-delay:400ms] lg:justify-start">
              <Link
                href="/servis-talep"
                className="rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/25 transition-all hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-xl hover:shadow-brand-900/30"
              >
                Servis Talebi Oluştur
              </Link>
              <WhatsAppButton
                message="Merhaba, robot süpürgem için servis talebinde bulunmak istiyorum."
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50"
              >
                WhatsApp Destek
              </WhatsAppButton>
            </div>
          </div>

          {/* Right: decorative rings + product photo + floating feature callouts */}
          <div className="animate-fade-up relative mx-auto hidden aspect-square w-full max-w-md [animation-delay:150ms] lg:block">
            <div className="absolute inset-0 rounded-full bg-brand-50" />
            <div className="absolute inset-[8%] rounded-full border border-brand-100" />
            <div className="absolute inset-[18%] rounded-full border border-brand-200" />
            <Image
              src="/hero-robot.jpg"
              alt="Robot süpürge"
              width={480}
              height={480}
              priority
              className="absolute inset-[14%] h-[72%] w-[72%] rounded-full object-cover shadow-xl shadow-brand-900/15"
            />

            {heroCallouts.map((callout) => (
              <div
                key={callout.title}
                className={`absolute w-56 rounded-2xl bg-white p-4 shadow-lg shadow-slate-900/10 ${callout.className}`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <SearchIcon />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{callout.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{callout.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compact mobile/tablet fallback for the visual above (no floating cards - avoids overlap on small screens) */}
          <div className="animate-fade-up relative mx-auto block aspect-square w-48 [animation-delay:150ms] lg:hidden">
            <div className="absolute inset-0 rounded-full bg-brand-50" />
            <div className="absolute inset-[10%] rounded-full border border-brand-200" />
            <Image
              src="/hero-robot.jpg"
              alt="Robot süpürge"
              width={200}
              height={200}
              className="absolute inset-[15%] h-[70%] w-[70%] rounded-full object-cover shadow-lg shadow-brand-900/15"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold text-slate-900">
          Teknik Servis Kapsamımız
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Robot süpürgenizin her bileşeni için uzmanlaşmış, ölçülebilir
          adımlarla ilerleyen bir onarım süreci sunuyoruz.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {serviceCategories.map(({ title, description, bullets, Icon }) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-slate-200 p-5 transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon />
              </span>
              <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-600">{description}</p>
              <ul className="mt-3 space-y-1.5">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-1.5 text-xs text-slate-600">
                    <CheckIcon className="h-3.5 w-3.5" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Link
                href="/servis-talep"
                className="mt-4 text-sm font-semibold text-brand-700 hover:underline"
              >
                Servis talebi oluştur →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <ServiceProcessSection />

      <TestCalibrationSection />

      <BrandsShowcase brands={allBrands} />

      <section className="overflow-hidden bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          {/* Left: coverage map */}
          <div className="relative">
            <ServiceCoverageMap />
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {coverageFeatures.map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm">
                    <f.Icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium text-slate-600">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: copy + quick province lookup */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-800">
              Türkiye Geneli Hizmet Ağımız
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              81 İlin Tamamına Robot Süpürge Servisi
            </h2>
            <p className="mt-3 text-slate-600">
              Samsun&apos;daki merkezimizden, anlaşmalı kargo ağıyla
              Türkiye&apos;nin her iline ulaşıyoruz. Nerede olursanız olun,
              cihazınızı bize güvenle gönderebilirsiniz.
            </p>

            <div className="mt-6">
              <ProvinceQuickSelect
                provinces={allProvinces.map((p) => ({ slug: p.slug, name: p.name }))}
              />
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {coverageChecklist.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <CheckIcon className="h-4 w-4" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/hizmet-bolgeleri"
              className="mt-6 inline-flex items-center gap-1 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              81 İli Görüntüle →
            </Link>
          </div>
        </div>
      </section>

      <GoogleReviewsSection />

      <section className="bg-brand-800 px-4 py-14 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold">
            {siteConfig.businessName} Farkını Yaşayın
          </h2>
          <p className="mt-3 text-brand-50">
            Cihazınızı adresinizden gönderin, ücretsiz arıza tespiti sonrası
            onayınızı alarak onarıma başlayalım.
          </p>
          <Link
            href="/servis-talep"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50"
          >
            Hemen Servis Talebi Oluştur
          </Link>
        </div>
      </section>
    </div>
  );
}
