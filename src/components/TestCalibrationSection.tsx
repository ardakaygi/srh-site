import {
  BatteryIcon,
  ChipIcon,
  GaugeIcon,
  RadarIcon,
  SearchIcon,
  ShieldCheckIcon,
} from "@/components/ServiceIcons";

const steps = [
  {
    title: "Teknik Analiz",
    description:
      "Cihazınızın donanım ve yazılım durumu, uzman ekibimiz tarafından baştan sona incelenir.",
    Icon: SearchIcon,
  },
  {
    title: "Anakart Kontrolü",
    description:
      "Elektronik kart üzerindeki bağlantı ve bileşenler mikro lehim hassasiyetinde kontrol edilir.",
    Icon: ChipIcon,
  },
  {
    title: "Batarya Testi",
    description:
      "Hücrelerin şarj kapasitesi ve deşarj performansı ölçülerek batarya sağlığı belirlenir.",
    Icon: BatteryIcon,
  },
  {
    title: "Sensör Kalibrasyonu",
    description:
      "LiDAR, jiroskop ve çarpışma sensörleri hassas ölçümlerle yeniden kalibre edilir.",
    Icon: RadarIcon,
  },
  {
    title: "Performans Testleri",
    description:
      "Emiş gücü, hareket ve navigasyon fonksiyonları gerçek kullanım koşullarında test edilir.",
    Icon: GaugeIcon,
  },
  {
    title: "Temizlik & Son Kontrol",
    description:
      "Cihaz detaylı temizlikten geçirilir, teslim öncesi son kalite kontrolü yapılır.",
    Icon: ShieldCheckIcon,
  },
];

export function TestCalibrationSection() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Test ve Kalibrasyon Sürecimiz
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center rounded-2xl border border-slate-200 p-5 text-center transition-shadow hover:shadow-md"
            >
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
