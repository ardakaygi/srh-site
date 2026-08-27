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
            <li><Link href="/atolye" className="hover:text-white">Atölyemiz</Link></li>
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
          <h3 className="text-sm font-semibold text-white">Yasal</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/kvkk-aydinlatma-metni" className="hover:text-white">KVKK Aydınlatma Metni</Link></li>
            <li><Link href="/cerez-politikasi" className="hover:text-white">Çerez Politikası</Link></li>
            <li><Link href="/iletisim" className="hover:text-white">İletişim</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteConfig.businessName}. Tüm hakları saklıdır.
        {" · "}
        Dreame logosu{" "}
        <a
          href="https://commons.wikimedia.org/wiki/File:Logo_of_Dreame.svg"
          className="underline hover:text-slate-300"
        >
          Wikimedia Commons
        </a>{" "}
        (CC BY-SA 4.0, Dreame Technology) kaynaklıdır. Türkiye harita anahattı{" "}
        <a
          href="https://commons.wikimedia.org/wiki/File:Map_of_Turkey.svg"
          className="underline hover:text-slate-300"
        >
          Nevit Dilmen
        </a>{" "}
        tarafından hazırlanmış, CC BY-SA 3.0 lisansı altında kullanılmıştır.
        Sitede görülen tüm marka isim ve logoları ilgili marka sahiplerine
        aittir; bu sayfada yalnızca hizmet verilen markaların tanıtımı
        amacıyla, marka sahipleriyle herhangi bir bağlantı veya yetkili
        servis ilişkisi iddia edilmeden kullanılmaktadır.
      </div>
    </footer>
  );
}
