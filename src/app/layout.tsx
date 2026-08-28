import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Forces every route in the app to render dynamically (per-request),
// never during `next build` (2026-08-28) - Header/Footer are async Server
// Components that call Prisma (getAllBrands/getSiteSettings) on every
// page via this root layout, and the production host's container can't
// run Prisma's native query engine during the build (see decisions.md
// and src/app/[slug]/page.tsx's comment). This single setting is what
// actually guarantees no page anywhere touches the database at build
// time - the per-page `dynamic`/removed-generateStaticParams changes
// elsewhere in the app are redundant with this but kept as accurate
// self-documentation for those specific routes.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} | Robot Süpürge Teknik Servisi`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description:
    "Samsun merkezli, Türkiye'nin 81 iline hizmet veren robot süpürge teknik servisi. Ücretsiz arıza tespiti, orijinal yedek parça ve batarya yenileme.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileBar />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
