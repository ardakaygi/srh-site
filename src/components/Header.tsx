import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/markalar", label: "Markalar" },
  { href: "/hizmet-bolgeleri", label: "Hizmet Bölgeleri" },
  { href: "/atolye", label: "Atölyemiz" },
  { href: "/servis-talep", label: "Servis Talebi" },
  { href: "/servis-takip", label: "Kargo Takip" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-slate-900">
          {siteConfig.businessName}
        </Link>
        <nav className="hidden gap-5 text-sm font-medium text-slate-700 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={siteConfig.phoneHref}
          className="hidden rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 md:inline-block"
        >
          Hemen Ara
        </a>
      </div>
    </header>
  );
}
