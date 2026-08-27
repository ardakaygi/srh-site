import { siteConfig } from "@/lib/site-config";

/** LocalBusiness node, reused (nested Service under it) across pSEO pages. */
export function localBusinessNode(extra?: Record<string, unknown>) {
  return {
    "@type": "LocalBusiness",
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.businessName,
    url: siteConfig.siteUrl,
    areaServed: "TR",
    ...extra,
  };
}

export function serviceNode(params: {
  name: string;
  description: string;
  areaServed?: string;
}) {
  return {
    "@type": "Service",
    name: params.name,
    description: params.description,
    areaServed: params.areaServed ?? "TR",
    provider: { "@id": `${siteConfig.siteUrl}/#organization` },
  };
}

export function faqPageNode(items: { question: string; answer: string }[]) {
  if (items.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
