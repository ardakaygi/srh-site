import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { faqPageNode } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description: `${siteConfig.businessName} servis süreci, garanti, kargo ve gizlilik hakkında sık sorulan sorular.`,
};

const faqs = [
  {
    question: "Servis talebimi nasıl oluşturabilirim?",
    answer:
      "WhatsApp üzerinden veya web sitemizdeki servis talebi formunu doldurarak marka, model ve arıza bilgilerinizi bize iletebilirsiniz.",
  },
  {
    question: "Arıza tespiti ücretli mi?",
    answer:
      "Hayır. Cihazınız merkezimize ulaştığında ücretsiz ve detaylı arıza tespiti yapıyoruz; onarım ücretini onaydan önce size bildiriyoruz.",
  },
  {
    question: "Onayım olmadan onarıma başlıyor musunuz?",
    answer:
      "Hayır. Arıza tespiti sonrası ücret ve süreç hakkında sizi bilgilendiriyoruz, onayınızı almadan hiçbir işlem yapmıyoruz.",
  },
  {
    question: "Cihazımı Samsun dışından nasıl gönderebilirim?",
    answer:
      "Servis talebi formunu doldurduktan sonra size özel bir kargo kodu ve gönderim talimatı iletiyoruz; Türkiye'nin 81 iline bu şekilde hizmet veriyoruz.",
  },
  {
    question: "Hangi markalara bakıyorsunuz?",
    answer: (
      <>
        Roborock, Xiaomi, Dreame, Ecovacs, iRobot, Samsung dahil çok sayıda
        markada teknik servis veriyoruz.{" "}
        <Link href="/markalar" className="text-brand-700 underline">
          Tüm markaları görüntüleyin
        </Link>
        .
      </>
    ),
  },
  {
    question: "Garanti süreniz ne kadar?",
    answer: `Yaptığımız tüm onarım ve batarya değişimleri ${siteConfig.warrantyLabel} kapsamındadır.`,
  },
  {
    question: "Orijinal yedek parça mı kullanıyorsunuz?",
    answer:
      "Onarımlarda orijinal veya orijinal eşdeğeri sertifikalı yedek parça kullanıyoruz; batarya paketlerimizi lehim değil, güvenli spot kaynak yöntemiyle üretiyoruz.",
  },
  {
    question: "Cihazımın durumunu nasıl takip edebilirim?",
    answer: (
      <>
        <Link href="/servis-takip" className="text-brand-700 underline">
          Kargo takip sayfamızdan
        </Link>{" "}
        ad soyad ve telefon numaranızla cihazınızın güncel durumunu
        sorgulayabilirsiniz.
      </>
    ),
  },
  {
    question: "Kişisel verilerim nasıl korunuyor?",
    answer: (
      <>
        Kişisel verileriniz yalnızca servis talebinizin işlenmesi amacıyla
        kullanılır.{" "}
        <Link href="/kvkk-aydinlatma-metni" className="text-brand-700 underline">
          KVKK Aydınlatma Metni&apos;ni
        </Link>{" "}
        inceleyebilirsiniz.
      </>
    ),
  },
  {
    question: "Cihazım onarılamayacak durumdaysa ne olur?",
    answer:
      "Arıza tespiti sonucunda onarımın ekonomik veya teknik olarak mümkün olmadığı durumları size açıkça bildiriyoruz; onayınız olmadan herhangi bir ücret talep etmiyoruz.",
  },
  {
    question: "Merkeziniz nerede?",
    answer: `Merkezimiz ${siteConfig.address} adresinde bulunuyor. Çalışma saatlerimiz: ${siteConfig.workingHours}.`,
  },
];

// JSON-LD only needs plain-text answers - the JSX/Link versions above are
// for on-page display with working internal links.
const faqPlainText = [
  { question: "Servis talebimi nasıl oluşturabilirim?", answer: "WhatsApp üzerinden veya web sitemizdeki servis talebi formunu doldurarak marka, model ve arıza bilgilerinizi bize iletebilirsiniz." },
  { question: "Arıza tespiti ücretli mi?", answer: "Hayır. Cihazınız merkezimize ulaştığında ücretsiz ve detaylı arıza tespiti yapıyoruz; onarım ücretini onaydan önce size bildiriyoruz." },
  { question: "Onayım olmadan onarıma başlıyor musunuz?", answer: "Hayır. Arıza tespiti sonrası ücret ve süreç hakkında sizi bilgilendiriyoruz, onayınızı almadan hiçbir işlem yapmıyoruz." },
  { question: "Cihazımı Samsun dışından nasıl gönderebilirim?", answer: "Servis talebi formunu doldurduktan sonra size özel bir kargo kodu ve gönderim talimatı iletiyoruz; Türkiye'nin 81 iline bu şekilde hizmet veriyoruz." },
  { question: "Hangi markalara bakıyorsunuz?", answer: "Roborock, Xiaomi, Dreame, Ecovacs, iRobot, Samsung dahil çok sayıda markada teknik servis veriyoruz." },
  { question: "Garanti süreniz ne kadar?", answer: `Yaptığımız tüm onarım ve batarya değişimleri ${siteConfig.warrantyLabel} kapsamındadır.` },
  { question: "Orijinal yedek parça mı kullanıyorsunuz?", answer: "Onarımlarda orijinal veya orijinal eşdeğeri sertifikalı yedek parça kullanıyoruz; batarya paketlerimizi lehim değil, güvenli spot kaynak yöntemiyle üretiyoruz." },
  { question: "Cihazımın durumunu nasıl takip edebilirim?", answer: "Kargo takip sayfamızdan ad soyad ve telefon numaranızla cihazınızın güncel durumunu sorgulayabilirsiniz." },
  { question: "Kişisel verilerim nasıl korunuyor?", answer: "Kişisel verileriniz yalnızca servis talebinizin işlenmesi amacıyla kullanılır. KVKK Aydınlatma Metni'ni inceleyebilirsiniz." },
  { question: "Cihazım onarılamayacak durumdaysa ne olur?", answer: "Arıza tespiti sonucunda onarımın ekonomik veya teknik olarak mümkün olmadığı durumları size açıkça bildiriyoruz; onayınız olmadan herhangi bir ücret talep etmiyoruz." },
  { question: "Merkeziniz nerede?", answer: `Merkezimiz ${siteConfig.address} adresinde bulunuyor. Çalışma saatlerimiz: ${siteConfig.workingHours}.` },
];

export default function SssPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [faqPageNode(faqPlainText)].filter(Boolean),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "Sık Sorulan Sorular", href: "/sss" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Sık Sorulan Sorular
      </h1>
      <p className="mt-2 text-slate-600">
        Servis sürecimiz, garanti ve gizlilik hakkında en çok sorulan
        sorular.
      </p>

      <dl className="mt-8 space-y-6">
        {faqs.map((item) => (
          <div key={item.question} className="border-b border-slate-100 pb-6">
            <dt className="font-semibold text-slate-900">{item.question}</dt>
            <dd className="mt-2 text-slate-600">{item.answer}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 text-center">
        <p className="text-slate-600">Aradığınız cevabı bulamadınız mı?</p>
        <Link
          href="/iletisim"
          className="mt-3 inline-block rounded-full bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          Bize Ulaşın
        </Link>
      </div>
    </div>
  );
}
