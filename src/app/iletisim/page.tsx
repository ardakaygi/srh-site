import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${siteConfig.businessName} ile iletişime geçin.`,
};

export default function IletisimPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "İletişim", href: "/iletisim" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold text-slate-900">İletişim</h1>

      <dl className="mt-6 space-y-4 text-slate-700">
        <div>
          <dt className="text-sm font-medium text-slate-500">Adres</dt>
          <dd>{siteConfig.address}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Telefon</dt>
          <dd>
            <a href={siteConfig.phoneHref} className="text-emerald-700 hover:underline">
              {siteConfig.phoneDisplay}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Çalışma Saatleri</dt>
          <dd>{siteConfig.workingHours}</dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={siteConfig.phoneHref}
          className="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Hemen Ara
        </a>
        <WhatsAppButton
          message="Merhaba, robot süpürgem hakkında bilgi almak istiyorum."
          className="rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          WhatsApp ile Yazın
        </WhatsAppButton>
      </div>
    </div>
  );
}
