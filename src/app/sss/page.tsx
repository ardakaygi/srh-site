import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getAllFaqItems } from "@/lib/data";
import { faqPageNode } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

// force-dynamic instead of ISR/revalidate - see src/app/page.tsx's comment.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description: `${siteConfig.businessName} servis süreci, garanti, kargo ve gizlilik hakkında sık sorulan sorular.`,
};

export default async function SssPage() {
  const faqs = await getAllFaqItems();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [faqPageNode(faqs)].filter(Boolean),
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
          <div key={item.id} className="border-b border-slate-100 pb-6">
            <dt className="font-semibold text-slate-900">{item.question}</dt>
            <dd className="mt-2 text-slate-600">{item.answer}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 rounded-2xl bg-slate-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Faydalı Bağlantılar
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li><Link href="/markalar" className="text-brand-700 hover:underline">Tüm Markalar</Link></li>
          <li><Link href="/servis-takip" className="text-brand-700 hover:underline">Kargo Takip</Link></li>
          <li><Link href="/kvkk-aydinlatma-metni" className="text-brand-700 hover:underline">KVKK Aydınlatma Metni</Link></li>
        </ul>
      </div>

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
