import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="text-base font-semibold text-white">
            {siteConfig.businessName}
          </p>
          <p className="mt-2 text-sm">{siteConfig.address}</p>
          <p className="mt-1 text-sm">{siteConfig.workingHours}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Hizmetler</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/tamir-merkezi" className="hover:text-white">Tamir Merkezimiz</Link></li>
            <li><Link href="/servis-talep" className="hover:text-white">Servis Talebi</Link></li>
            <li><Link href="/servis-takip" className="hover:text-white">Kargo Takip</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Markalar &amp; Bölgeler</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/markalar" className="hover:text-white">Tüm Markalar</Link></li>
            <li><Link href="/hizmet-bolgeleri" className="hover:text-white">Tüm İller</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Kurumsal</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/kurumsal" className="hover:text-white">Hakkımızda</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/sss" className="hover:text-white">Sık Sorulan Sorular</Link></li>
            <li><Link href="/iletisim" className="hover:text-white">İletişim</Link></li>
            <li><Link href="/kvkk-aydinlatma-metni" className="hover:text-white">KVKK Aydınlatma Metni</Link></li>
            <li><Link href="/cerez-politikasi" className="hover:text-white">Çerez Politikası</Link></li>
            <li><Link href="/telif-ve-marka-bildirimi" className="hover:text-white">Telif ve Marka Bildirimi</Link></li>
            <li><Link href="/yasal-uyari" className="hover:text-white">Yasal Uyarı</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.businessName}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
