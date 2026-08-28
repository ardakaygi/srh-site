import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

/**
 * Global route-loading screen (Next.js App Router convention - this file
 * automatically wraps every page in a Suspense boundary and is shown
 * while a segment's Server Component data is being fetched, including on
 * first visit). Kept intentionally simple: the same logo/ring treatment
 * as the homepage hero visual, so it reads as part of the same brand
 * rather than a generic spinner.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-100" />
        <span className="absolute inset-[10%] rounded-full border border-brand-200" />
        <Image
          src="/logo.svg"
          alt={siteConfig.businessName}
          width={64}
          height={64}
          priority
          className="relative h-14 w-14 animate-pulse object-contain"
        />
      </div>
      <span className="sr-only">Yükleniyor…</span>
    </div>
  );
}
