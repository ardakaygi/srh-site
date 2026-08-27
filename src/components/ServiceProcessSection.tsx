import {
  ClipboardIcon,
  SearchIcon,
  ShieldCheckIcon,
  ThumbsUpIcon,
  TruckIcon,
  WrenchIcon,
} from "@/components/ServiceIcons";

const steps = [
  {
    title: "Servis Talebi",
    description:
      "WhatsApp veya web sitemiz üzerinden marka, model ve arıza bilgilerinizi paylaşarak servis talebinizi oluşturun.",
    Icon: ClipboardIcon,
  },
  {
    title: "Kargo Gönderimi",
    description:
      "Onayınızın ardından size özel kargo koduyla cihazınızı ücretsiz olarak merkezimize gönderin.",
    Icon: TruckIcon,
  },
  {
    title: "Teknik Arıza Tespiti",
    description:
      "Cihazınız merkezimize ulaştığında uzman teknisyenlerimiz ücretsiz ve detaylı arıza tespiti yapar.",
    Icon: SearchIcon,
  },
  {
    title: "Onay Süreci",
    description:
      "Tespit edilen arızayı ve onarım ücretini size bildiririz; onayınızı aldıktan sonra onarıma başlarız.",
    Icon: ThumbsUpIcon,
  },
  {
    title: "Onarım ve Test",
    description:
      "Orijinal yedek parçalarla onarımı tamamlar, cihazınızı fonksiyon testlerinden geçiririz.",
    Icon: WrenchIcon,
  },
  {
    title: "Güvenli Teslimat",
    description:
      "Garanti belgesiyle birlikte cihazınızı özenle paketleyip adresinize güvenle gönderiyoruz.",
    Icon: ShieldCheckIcon,
  },
];

export function ServiceProcessSection() {
  return (
    <section className="bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Servis Sürecimiz Nasıl İşler?
        </h2>

        {/* Numbered connector row - desktop only, purely decorative */}
        <div className="relative mt-12 hidden lg:grid lg:grid-cols-6">
          <div
            className="absolute inset-x-[8.3%] top-1/2 h-px -translate-y-1/2 bg-slate-200"
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <div key={step.title} className="relative z-10 flex justify-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white ring-4 ring-slate-50">
                {i + 1}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-4 lg:grid-cols-6 lg:gap-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white lg:hidden">
                {i + 1}
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <step.Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
