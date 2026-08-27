import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: `${siteConfig.businessName} KVKK Aydınlatma Metni.`,
  robots: { index: false, follow: true },
};

export default function KvkkPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        KVKK Aydınlatma Metni
      </h1>

      <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Taslak — yayın öncesi hukuki onay gereklidir.</strong> Bu
        sayfa 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında
        zorunlu olan aydınlatma metninin iskeletini içerir. Aşağıdaki metin,
        gerçek veri sorumlusu unvanı, iletişim bilgileri ve veri işleme
        envanteri ile bir hukuk danışmanı tarafından doldurulup onaylanmadan
        yayına alınmamalıdır.
      </div>

      <div className="prose prose-slate mt-6 max-w-none">
        <h2>1. Veri Sorumlusu</h2>
        <p>
          [Veri sorumlusunun tam unvanı, adresi ve iletişim bilgileri
          buraya eklenecektir — bkz. <code>site-config.ts</code>.]
        </p>

        <h2>2. İşlenen Kişisel Veriler</h2>
        <p>
          Servis talebi formu aracılığıyla; ad soyad, telefon numarası, adres
          ve cihaza ilişkin arıza bilgileri işlenmektedir.
        </p>

        <h2>3. Kişisel Verilerin İşlenme Amacı</h2>
        <p>
          Kişisel verileriniz, servis talebinizin oluşturulması, cihazınızın
          kargo ile teslim alınması, onarım sürecinin yürütülmesi ve
          tarafınızla iletişime geçilmesi amacıyla işlenmektedir.
        </p>

        <h2>4. Kişisel Verilerin Aktarılması</h2>
        <p>
          Kargo/teslimat sürecinin yürütülmesi amacıyla anlaşmalı kargo
          firması ile adınız, telefon numaranız ve adresiniz paylaşılabilir.
          [Kargo firması adı teyit edildiğinde buraya eklenecektir.]
        </p>

        <h2>5. Veri Sahibinin Hakları</h2>
        <p>
          KVKK&apos;nın 11. maddesi uyarınca kişisel verilerinizin işlenip
          işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme,
          düzeltilmesini veya silinmesini isteme haklarına sahipsiniz.
          Başvurularınızı [iletişim kanalı teyit edilecek] üzerinden
          iletebilirsiniz. Başvurunuz en geç 30 gün içinde yanıtlanır.
        </p>
      </div>
    </div>
  );
}
