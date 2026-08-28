import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChipIcon, SearchIcon, ShieldCheckIcon, TruckIcon } from "@/components/ServiceIcons";
import { getAllBrands } from "@/lib/data";
import { ilMarkaSlug } from "@/lib/slugs";
import { siteConfig } from "@/lib/site-config";

const FOOTER_BRAND_SLUGS = ["roborock", "xiaomi", "dreame", "ecovacs"];

const hizmetLinks = [
  "Teknik Servis",
  "Arıza Tespiti",
  "Batarya Değişimi",
  "LiDAR Sensör Tamiri",
  "Bakım & Temizlik",
];

const destekLinks = [
  { href: "/servis-talep", label: "Servis Talebi" },
  { href: "/servis-takip", label: "Kargo Takip" },
  { href: "/hizmet-bolgeleri", label: "Hizmet Bölgeleri" },
  { href: "/blog", label: "Blog" },
  { href: "/sss", label: "Sık Sorulan Sorular" },
  { href: "/iletisim", label: "İletişim" },
];

const bottomBadges = [
  { label: "Anlaşmalı Kargo", description: "81 ilden gönderim", Icon: TruckIcon },
  { label: "Orijinal Yedek Parça", description: "Sertifikalı parça garantisi", Icon: ChipIcon },
  { label: siteConfig.warrantyLabel, description: "Tüm onarımlarda geçerli", Icon: ShieldCheckIcon },
  { label: "Ücretsiz Arıza Tespiti", description: "Onay öncesi ücret yok", Icon: SearchIcon },
];

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-400">
      <path fillRule="evenodd" d="M10 18s6-5.686 6-10a6 6 0 10-12 0c0 4.314 6 10 6 10zm0-7a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-400">
      <path d="M3.654 1.328a.678.678 0 01.958 0l2.25 2.25a.678.678 0 010 .958L5.4 6H4.5a.5.5 0 00-.5.5c0 3.038 2.462 5.5 5.5 5.5a.5.5 0 00.5-.5v-.9l1.464-1.464a.678.678 0 01.958 0l2.25 2.25a.678.678 0 010 .958l-1.1 1.1c-.5.5-1.236.673-1.9.45C7.86 12.5 3.5 8.14 2.15 4.328c-.223-.664-.05-1.4.45-1.9l1.054-1.1z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-400">
      <path d="M3 4a2 2 0 00-2 2v.383l9 5.4 9-5.4V6a2 2 0 00-2-2H3z" />
      <path d="M18 8.883l-8.485 5.091a1 1 0 01-1.03 0L1 8.883V14a2 2 0 002 2h14a2 2 0 002-2V8.883z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-400">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.06-1.33A10 10 0 1012 2zm0 18a8 8 0 01-4.08-1.12l-.29-.17-3.02.79.8-2.94-.19-.3A8 8 0 1112 20zm4.4-5.9c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

export async function Footer() {
  const allBrands = await getAllBrands();
  const footerBrands = FOOTER_BRAND_SLUGS.map((slug) => allBrands.find((b) => b.slug === slug)).filter(
    (b): b is NonNullable<typeof b> => Boolean(b),
  );

  return (
    <footer className="mt-auto border-t border-black/10 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt=""
                aria-hidden="true"
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 brightness-0 invert"
              />
              <span className="text-lg font-bold text-white">{siteConfig.businessName}</span>
            </Link>
            <p className="mt-3 text-sm text-brand-200">
              Karadeniz&apos;in En Kapsamlı Robot Süpürge Tamir Merkezi
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Hizmetlerimiz</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {hizmetLinks.map((label) => (
                <li key={label}>
                  <Link href="/servis-talep" className="hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Markalar</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {footerBrands.map((brand) => (
                <li key={brand.slug}>
                  <Link href={`/${ilMarkaSlug(brand.slug)}`} className="hover:text-white">
                    {brand.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/markalar" className="font-medium text-brand-300 hover:text-white">
                  Tüm Markalar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Destek</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {destekLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">İletişim</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <PinIcon />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <PhoneIcon />
                <div>
                  <a href={siteConfig.phoneHref} className="hover:text-white">
                    {siteConfig.phoneDisplay}
                  </a>
                  <p className="text-xs text-slate-500">{siteConfig.workingHours}</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MailIcon />
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white">
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <WhatsAppIcon />
                <WhatsAppButton
                  message="Merhaba, robot süpürgem hakkında bilgi almak istiyorum."
                  className="hover:text-white"
                >
                  WhatsApp Destek
                </WhatsAppButton>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl bg-white/5 p-6 sm:grid-cols-4">
          {bottomBadges.map(({ label, description, Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-800 text-brand-200">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-slate-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.businessName}. Tüm
            hakları saklıdır.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/kurumsal" className="hover:text-slate-300">Hakkımızda</Link>
            <Link href="/kvkk-aydinlatma-metni" className="hover:text-slate-300">KVKK Aydınlatma Metni</Link>
            <Link href="/cerez-politikasi" className="hover:text-slate-300">Çerez Politikası</Link>
            <Link href="/telif-ve-marka-bildirimi" className="hover:text-slate-300">Telif ve Marka Bildirimi</Link>
            <Link href="/yasal-uyari" className="hover:text-slate-300">Yasal Uyarı</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
