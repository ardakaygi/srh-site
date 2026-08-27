import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChipIcon } from "@/components/ServiceIcons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kurumsal",
  description:
    `${siteConfig.businessName} hakkında: hikayemiz, vizyonumuz, misyonumuz ve değerlerimiz.`,
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-brand-600">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" strokeLinejoin="round" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className="h-6 w-6">
      <path d="M6 3v18" />
      <path d="M6 4h11l-2.5 4L17 12H6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3Z" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 11l4-3 4 2 3-2 4 3" />
      <path d="M3 11l3 5 4 2 2-1" />
      <path d="M21 11l-3 5-4 2" />
      <path d="M11 10l3 3-2 2" />
    </svg>
  );
}

const values = [
  {
    title: "Şeffaflık",
    description: "Onayınız olmadan hiçbir işlem yapmayız; ücretsiz arıza tespiti sonrası net bir teklif sunar, kararı size bırakırız.",
    Icon: ShieldIcon,
  },
  {
    title: "Teknik Derinlik",
    description: "Basit parça değişiminin ötesinde, mikro lehim seviyesinde anakart onarımı ve özel batarya üretimi yapabilen bir atölyeyiz.",
    Icon: ChipIcon,
  },
  {
    title: "Marka Bağımsızlığı",
    description: "Hiçbir markanın yetkili servisi değiliz; bu da bize her markaya eşit mesafede, tarafsız teknik değerlendirme yapma özgürlüğü verir.",
    Icon: HandshakeIcon,
  },
  {
    title: "Erişilebilirlik",
    description: "Samsun'daki tek bir atölyeden, anlaşmalı kargo ağıyla Türkiye'nin 81 iline aynı kalitede hizmet ulaştırıyoruz.",
    Icon: CompassIcon,
  },
];

const missionCommitments = [
  "Marka veya model fark etmeksizin, her cihaza aynı teknik özenle yaklaşmak.",
  "Arıza tespitini her zaman ücretsiz yapmak; onarıma yalnızca onayınızla başlamak.",
  "Sadece orijinal veya orijinal eşdeğeri, test edilmiş yedek parça kullanmak.",
  "Batarya değişimlerinde lehim değil, güvenlik standartlarına uygun spot kaynak yöntemini kullanmak.",
  "Yaptığımız her onarımı garanti kapsamında sunmak.",
  "Kargo sürecini uçtan uca takip edilebilir ve şeffaf tutmak.",
];

const stats = [
  { value: "81", label: "İlde Hizmet" },
  { value: "29+", label: "Markada Uzmanlık" },
  { value: siteConfig.warrantyLabel.replace(" Garanti", ""), label: "Garanti Süresi" },
  { value: "Samsun", label: "Merkez Atölye" },
];

export default function KurumsalPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Kurumsal", href: "/kurumsal" },
        ]}
      />

      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-800">
        Kurumsal
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
        Hakkımızda
      </h1>

      {/* Stats row - only confirmed, real figures */}
      <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-brand-700">{s.value}</p>
            <p className="mt-1 text-xs font-medium text-slate-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Hakkımızda */}
      <section className="mt-12 space-y-4 leading-relaxed text-slate-700">
        <p>
          {siteConfig.businessName}, robot süpürgelerin artık her evin
          vazgeçilmez bir parçası hâline geldiği bir dönemde, bu cihazların
          arızalandığında nereye götürüleceği sorusuna Samsun&apos;dan net bir
          cevap vermek için kuruldu. Piyasadaki genel elektronik tamircilerin
          aksine, yalnızca robot süpürgelere odaklanan; markası, modeli veya
          yaşı ne olursa olsun her cihaza aynı teknik titizlikle yaklaşan
          bağımsız bir teknik servisiz.
        </p>
        <p>
          Atölyemizde arıza tespitinden nihai teslimata kadar tüm süreç kendi
          çatımız altında yürütülür: LiDAR sensör kalibrasyonundan mikro
          lehim seviyesinde anakart onarımına, aşınmış motor ve tekerlek
          gruplarının yenilenmesinden orijinal hücrelerle spot kaynaklı özel
          batarya paketi üretimine kadar geniş bir teknik yelpazede hizmet
          veriyoruz. Bu derinlik, çoğu &quot;basit yedek parça
          değişimi&quot;yle sınırlı kalan genel elektronik servislerinden
          bizi ayıran temel fark.
        </p>
        <p>
          Samsun&apos;da tek bir merkez atölyeden çalışıyor olmamız, hizmet
          alanımızı sınırlamıyor: anlaşmalı kargo ağımız sayesinde
          Türkiye&apos;nin 81 iline aynı süreç ve aynı kalite standardıyla
          ulaşabiliyoruz. Cihazınızı nereden gönderirseniz gönderin, sizi
          karşılayan süreç her zaman aynıdır — ücretsiz arıza tespiti, net
          bir teklif, onayınızla başlayan onarım ve garantili teslim.
        </p>
      </section>

      {/* Vizyon & Misyon */}
      <section className="mt-14 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <CompassIcon />
          </span>
          <h2 className="mt-4 text-xl font-bold text-slate-900">Vizyonumuz</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Türkiye&apos;nin herhangi bir noktasındaki bir robot süpürge
            kullanıcısının, cihazı arızalandığında akla gelen ilk ve güvenilir
            adres olmak. Bağımsız, marka bağlantısı olmayan bir teknik
            servisin; yetkili servislerle aynı, hatta bazı alanlarda (mikro
            elektronik onarım, özel batarya üretimi gibi) daha derin bir
            teknik yetkinlik sunabileceğini kanıtlamak istiyoruz.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <FlagIcon />
          </span>
          <h2 className="mt-4 text-xl font-bold text-slate-900">Misyonumuz</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Robot süpürgesi arızalanan her müşterimize, markası ne olursa
            olsun, şeffaf, adil ve teknik açıdan sağlam bir çözüm sunmak.
            Bunu her onarımda şu somut taahhütlerle karşılıyoruz:
          </p>
          <ul className="mt-4 space-y-2">
            {missionCommitments.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Değerlerimiz */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-slate-900">Değerlerimiz</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="flex gap-4 rounded-2xl border border-slate-200 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <v.Icon />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">{v.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-800 p-8 text-white">
        <div>
          <h2 className="text-xl font-bold">Robot süpürgeniz mi arızalandı?</h2>
          <p className="mt-1 text-brand-50">
            Ücretsiz arıza tespiti için hemen servis talebi oluşturun.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/servis-talep"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
          >
            Servis Talebi Oluştur
          </Link>
          <Link
            href="/iletisim"
            className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            İletişime Geçin
          </Link>
        </div>
      </section>
    </div>
  );
}
