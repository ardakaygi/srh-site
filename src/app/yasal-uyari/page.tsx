import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Yasal Uyarı",
  description: `${siteConfig.businessName} yasal uyarı ve telif hakkı bildirimi.`,
};

export default function YasalUyariPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Yasal Uyarı", href: "/yasal-uyari" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Yasal Uyarı</h1>

      <div className="prose prose-slate mt-6 max-w-none">
        <h2>Sorumluluk Reddi</h2>
        <p>
          Bu web sitesini kullanmanız kendi sorumluluğunuzdadır. Site,
          herhangi bir açık veya zımni garanti verilmeksizin &quot;olduğu
          gibi&quot; sunulmaktadır; {siteConfig.businessName} sitedeki
          içeriklerin ticarete elverişliliği, belirli bir amaca uygunluğu
          veya üçüncü taraf haklarını ihlal etmediği yönünde herhangi bir
          taahhütte bulunmaz.
        </p>
        <p>
          Siteden indirdiğiniz herhangi bir dosya veya materyalin
          kullanımından doğabilecek her türlü risk (bilgisayar sisteminize
          gelebilecek zarar veya veri kaybı dahil) size aittir.
        </p>

        <h2>Telif Hakkı Bildirimi</h2>
        <p>
          Aksi açıkça belirtilmedikçe, bu sitede yer alan metin, grafik,
          görsel ve tasarım unsurları {siteConfig.businessName} markasını
          işleten {siteConfig.legalEntityName}&apos;ne aittir. Bu içerikler,
          kişisel/özel kullanım dışında, önceden yazılı izin alınmaksızın
          hiçbir biçimde kopyalanamaz, çoğaltılamaz, dağıtılamaz veya başka
          bir mecrada yayınlanamaz.
        </p>
        <p>
          Sitede tanıtım amacıyla gösterilen üçüncü taraf marka isim ve
          logoları kendi sahiplerine aittir; ayrıntılar için{" "}
          <Link href="/telif-ve-marka-bildirimi" className="text-brand-700 underline">
            Telif ve Marka Bildirimi
          </Link>{" "}
          sayfasına bakabilirsiniz.
        </p>

        <h2>Yasal Dayanak</h2>
        <p>
          Sitenin özgün içeriği, başta 5846 sayılı Fikir ve Sanat Eserleri
          Kanunu olmak üzere ilgili fikri mülkiyet mevzuatının koruması
          altındadır.
        </p>

        <h2>Yetkili Mahkeme</h2>
        <p>
          Bu site ve içeriğinin kullanımından doğabilecek uyuşmazlıklarda
          Türk hukuku uygulanır; Samsun mahkemeleri ve icra daireleri
          yetkilidir.
        </p>
      </div>
    </div>
  );
}
