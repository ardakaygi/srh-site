"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/hizmet-bolgeleri", label: "Hizmet Bölgeleri" },
  { href: "/markalar", label: "Markalar" },
  { href: "/servis-talep", label: "Servis Talebi Oluştur" },
  { href: "/servis-takip", label: "Kargo Takip" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/iletisim", label: "İletişim" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-0 top-[57px] z-40 max-h-[calc(100vh-57px)] overflow-y-auto border-b border-slate-200 bg-white shadow-lg"
        >
          <nav className="flex flex-col px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-slate-100 py-3 text-base font-medium text-slate-700 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.phoneHref}
              onClick={() => setOpen(false)}
              className="my-3 rounded-full bg-brand-700 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Hemen Ara
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
