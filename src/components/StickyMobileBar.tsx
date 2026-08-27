import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-black/10 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] md:hidden">
      <a
        href={siteConfig.phoneHref}
        className="flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-semibold text-slate-800"
        aria-label="Telefonla ara"
      >
        Ara
      </a>
      <WhatsAppButton
        message="Merhaba, robot süpürgem için servis talebinde bulunmak istiyorum."
        className="flex flex-1 items-center justify-center gap-1.5 border-x border-black/10 bg-brand-600 py-3 text-sm font-semibold text-white"
      >
        WhatsApp
      </WhatsAppButton>
      <Link
        href="/servis-talep"
        className="flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-semibold text-slate-800"
      >
        Servis Talebi
      </Link>
    </div>
  );
}
