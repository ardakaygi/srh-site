import Image from "next/image";
import Link from "next/link";
import { BrandsMegaMenu } from "@/components/BrandsMegaMenu";
import { MobileNav } from "@/components/MobileNav";
import { NavDropdown } from "@/components/NavDropdown";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getAllBrands } from "@/lib/data";
import { getSiteSettings } from "@/lib/siteSettings";
import { siteConfig } from "@/lib/site-config";

const beforeBrandsNav = [
  { eyebrow: "81 İlde Hizmet", label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" },
];
const afterBrandsNav = [{ label: "Kargo Takip", href: "/servis-takip" }];

const kurumsalDropdownItems = [
  { href: "/kurumsal", label: "Hakkımızda" },
  { href: "/blog", label: "Blog" },
  { href: "/sss", label: "Sık Sorulan Sorular" },
  { href: "/iletisim", label: "İletişim" },
];

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M3.654 1.328a.678.678 0 01.958 0l2.25 2.25a.678.678 0 010 .958L5.4 6H4.5a.5.5 0 00-.5.5c0 3.038 2.462 5.5 5.5 5.5a.5.5 0 00.5-.5v-.9l1.464-1.464a.678.678 0 01.958 0l2.25 2.25a.678.678 0 010 .958l-1.1 1.1c-.5.5-1.236.673-1.9.45C7.86 12.5 3.5 8.14 2.15 4.328c-.223-.664-.05-1.4.45-1.9l1.054-1.1z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.06-1.33A10 10 0 1012 2zm0 18a8 8 0 01-4.08-1.12l-.29-.17-3.02.79.8-2.94-.19-.3A8 8 0 1112 20zm4.4-5.9c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 00-2 2v1.5a1 1 0 001 1 1.5 1.5 0 010 3 1 1 0 00-1 1V14a2 2 0 002 2h12a2 2 0 002-2v-1.5a1 1 0 00-1-1 1.5 1.5 0 010-3 1 1 0 001-1V6a2 2 0 00-2-2H4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export async function Header() {
  const [allBrands, settings] = await Promise.all([getAllBrands(), getSiteSettings()]);
  // "Popüler" = has an admin-uploaded logo (see /admin/markalar) - a new
  // logo automatically promotes a brand here, no hardcoded slug list.
  const popularBrands = allBrands.filter((b) => b.logoUrl);
  const otherBrands = allBrands.filter((b) => !b.logoUrl).slice(0, 12);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Top utility bar - contact + quick CTA, matches the reference layout's
          two-tier structure. Hidden on small screens to save vertical space. */}
      <div className="hidden bg-brand-900 text-white md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs">
          <p className="font-medium text-brand-50">{settings.brand_tagline}</p>
          <div className="flex items-center gap-5">
            <a href={siteConfig.phoneHref} className="flex items-center gap-1.5 hover:text-brand-100">
              <PhoneIcon />
              {siteConfig.phoneDisplay}
            </a>
            <WhatsAppButton
              message="Merhaba, robot süpürgem hakkında bilgi almak istiyorum."
              className="flex items-center gap-1.5 hover:text-brand-100"
            >
              <WhatsAppIcon />
              WhatsApp Destek
            </WhatsAppButton>
            <Link href="/servis-talep" className="flex items-center gap-1.5 hover:text-brand-100">
              <TicketIcon />
              Servis Talebi Oluştur
            </Link>
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-b border-black/10 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/logo.svg" alt="" aria-hidden="true" width={48} height={48} className="h-12 w-12" />
          <span className="text-lg font-bold text-slate-900">{siteConfig.businessName}</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {beforeBrandsNav.map((item) => (
            <Link key={item.href} href={item.href} className="group leading-tight">
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-brand-600">
                {item.eyebrow}
              </span>
              <span className="block text-sm font-semibold text-slate-800 group-hover:text-brand-700">
                {item.label}
              </span>
            </Link>
          ))}

          <BrandsMegaMenu popularBrands={popularBrands} otherBrands={otherBrands} />

          {afterBrandsNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-800 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}

          <NavDropdown label="Kurumsal" items={kurumsalDropdownItems} />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50"
          >
            Hemen Ara
          </a>
          <Link
            href="/servis-talep"
            className="rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Servis Talebi Oluştur
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
