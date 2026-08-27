/**
 * All 81 Turkish provinces with official plate code (plaka kodu) and
 * official 7-region geographic classification (coğrafi bölge) - stable,
 * well-established administrative/geographic facts, not sourced from any
 * particular website.
 *
 * Content differentiation is REGION-level, not bespoke per-province prose:
 * each region gets one grounded-in-fact regionalIntro/FAQ set (real climate
 * archetypes: Karadeniz humidity, İç Anadolu dust/aridity, Akdeniz summer
 * heat, Ege coastal humidity, Marmara dense urban wear, Doğu Anadolu harsh
 * winters/battery capacity, Güneydoğu Anadolu extreme summer heat), with
 * the actual province name and computed lead time varying per page. This
 * is an honest middle ground between full per-city bespoke copy (not
 * attempted here - tracked in known-issues.md) and the thin, purely
 * name-swapped template MASTER_PROMPT.md §5.1 warns against.
 */

export type Region =
  | "Marmara"
  | "Ege"
  | "Akdeniz"
  | "İç Anadolu"
  | "Karadeniz"
  | "Doğu Anadolu"
  | "Güneydoğu Anadolu";

interface ProvinceRow {
  code: string; // plaka kodu, 01-81
  name: string;
  slug: string;
  region: Region;
}

// Ordered 01-81 by official plaka kodu.
const PROVINCE_TABLE: ProvinceRow[] = [
  { code: "01", name: "Adana", slug: "adana", region: "Akdeniz" },
  { code: "02", name: "Adıyaman", slug: "adiyaman", region: "Güneydoğu Anadolu" },
  { code: "03", name: "Afyonkarahisar", slug: "afyonkarahisar", region: "Ege" },
  { code: "04", name: "Ağrı", slug: "agri", region: "Doğu Anadolu" },
  { code: "05", name: "Amasya", slug: "amasya", region: "Karadeniz" },
  { code: "06", name: "Ankara", slug: "ankara", region: "İç Anadolu" },
  { code: "07", name: "Antalya", slug: "antalya", region: "Akdeniz" },
  { code: "08", name: "Artvin", slug: "artvin", region: "Karadeniz" },
  { code: "09", name: "Aydın", slug: "aydin", region: "Ege" },
  { code: "10", name: "Balıkesir", slug: "balikesir", region: "Marmara" },
  { code: "11", name: "Bilecik", slug: "bilecik", region: "Marmara" },
  { code: "12", name: "Bingöl", slug: "bingol", region: "Doğu Anadolu" },
  { code: "13", name: "Bitlis", slug: "bitlis", region: "Doğu Anadolu" },
  { code: "14", name: "Bolu", slug: "bolu", region: "Karadeniz" },
  { code: "15", name: "Burdur", slug: "burdur", region: "Akdeniz" },
  { code: "16", name: "Bursa", slug: "bursa", region: "Marmara" },
  { code: "17", name: "Çanakkale", slug: "canakkale", region: "Marmara" },
  { code: "18", name: "Çankırı", slug: "cankiri", region: "İç Anadolu" },
  { code: "19", name: "Çorum", slug: "corum", region: "Karadeniz" },
  { code: "20", name: "Denizli", slug: "denizli", region: "Ege" },
  { code: "21", name: "Diyarbakır", slug: "diyarbakir", region: "Güneydoğu Anadolu" },
  { code: "22", name: "Edirne", slug: "edirne", region: "Marmara" },
  { code: "23", name: "Elazığ", slug: "elazig", region: "Doğu Anadolu" },
  { code: "24", name: "Erzincan", slug: "erzincan", region: "Doğu Anadolu" },
  { code: "25", name: "Erzurum", slug: "erzurum", region: "Doğu Anadolu" },
  { code: "26", name: "Eskişehir", slug: "eskisehir", region: "İç Anadolu" },
  { code: "27", name: "Gaziantep", slug: "gaziantep", region: "Güneydoğu Anadolu" },
  { code: "28", name: "Giresun", slug: "giresun", region: "Karadeniz" },
  { code: "29", name: "Gümüşhane", slug: "gumushane", region: "Karadeniz" },
  { code: "30", name: "Hakkari", slug: "hakkari", region: "Doğu Anadolu" },
  { code: "31", name: "Hatay", slug: "hatay", region: "Akdeniz" },
  { code: "32", name: "Isparta", slug: "isparta", region: "Akdeniz" },
  { code: "33", name: "Mersin", slug: "mersin", region: "Akdeniz" },
  { code: "34", name: "İstanbul", slug: "istanbul", region: "Marmara" },
  { code: "35", name: "İzmir", slug: "izmir", region: "Ege" },
  { code: "36", name: "Kars", slug: "kars", region: "Doğu Anadolu" },
  { code: "37", name: "Kastamonu", slug: "kastamonu", region: "Karadeniz" },
  { code: "38", name: "Kayseri", slug: "kayseri", region: "İç Anadolu" },
  { code: "39", name: "Kırklareli", slug: "kirklareli", region: "Marmara" },
  { code: "40", name: "Kırşehir", slug: "kirsehir", region: "İç Anadolu" },
  { code: "41", name: "Kocaeli", slug: "kocaeli", region: "Marmara" },
  { code: "42", name: "Konya", slug: "konya", region: "İç Anadolu" },
  { code: "43", name: "Kütahya", slug: "kutahya", region: "Ege" },
  { code: "44", name: "Malatya", slug: "malatya", region: "Doğu Anadolu" },
  { code: "45", name: "Manisa", slug: "manisa", region: "Ege" },
  { code: "46", name: "Kahramanmaraş", slug: "kahramanmaras", region: "Akdeniz" },
  { code: "47", name: "Mardin", slug: "mardin", region: "Güneydoğu Anadolu" },
  { code: "48", name: "Muğla", slug: "mugla", region: "Ege" },
  { code: "49", name: "Muş", slug: "mus", region: "Doğu Anadolu" },
  { code: "50", name: "Nevşehir", slug: "nevsehir", region: "İç Anadolu" },
  { code: "51", name: "Niğde", slug: "nigde", region: "İç Anadolu" },
  { code: "52", name: "Ordu", slug: "ordu", region: "Karadeniz" },
  { code: "53", name: "Rize", slug: "rize", region: "Karadeniz" },
  { code: "54", name: "Sakarya", slug: "sakarya", region: "Marmara" },
  { code: "55", name: "Samsun", slug: "samsun", region: "Karadeniz" },
  { code: "56", name: "Siirt", slug: "siirt", region: "Güneydoğu Anadolu" },
  { code: "57", name: "Sinop", slug: "sinop", region: "Karadeniz" },
  { code: "58", name: "Sivas", slug: "sivas", region: "İç Anadolu" },
  { code: "59", name: "Tekirdağ", slug: "tekirdag", region: "Marmara" },
  { code: "60", name: "Tokat", slug: "tokat", region: "Karadeniz" },
  { code: "61", name: "Trabzon", slug: "trabzon", region: "Karadeniz" },
  { code: "62", name: "Tunceli", slug: "tunceli", region: "Doğu Anadolu" },
  { code: "63", name: "Şanlıurfa", slug: "sanliurfa", region: "Güneydoğu Anadolu" },
  { code: "64", name: "Uşak", slug: "usak", region: "Ege" },
  { code: "65", name: "Van", slug: "van", region: "Doğu Anadolu" },
  { code: "66", name: "Yozgat", slug: "yozgat", region: "İç Anadolu" },
  { code: "67", name: "Zonguldak", slug: "zonguldak", region: "Karadeniz" },
  { code: "68", name: "Aksaray", slug: "aksaray", region: "İç Anadolu" },
  { code: "69", name: "Bayburt", slug: "bayburt", region: "Karadeniz" },
  { code: "70", name: "Karaman", slug: "karaman", region: "İç Anadolu" },
  { code: "71", name: "Kırıkkale", slug: "kirikkale", region: "İç Anadolu" },
  { code: "72", name: "Batman", slug: "batman", region: "Güneydoğu Anadolu" },
  { code: "73", name: "Şırnak", slug: "sirnak", region: "Güneydoğu Anadolu" },
  { code: "74", name: "Bartın", slug: "bartin", region: "Karadeniz" },
  { code: "75", name: "Ardahan", slug: "ardahan", region: "Doğu Anadolu" },
  { code: "76", name: "Iğdır", slug: "igdir", region: "Doğu Anadolu" },
  { code: "77", name: "Yalova", slug: "yalova", region: "Marmara" },
  { code: "78", name: "Karabük", slug: "karabuk", region: "Karadeniz" },
  { code: "79", name: "Kilis", slug: "kilis", region: "Güneydoğu Anadolu" },
  { code: "80", name: "Osmaniye", slug: "osmaniye", region: "Akdeniz" },
  { code: "81", name: "Düzce", slug: "duzce", region: "Karadeniz" },
];

const REGION_META: Record<
  Region,
  {
    leadTimeLabel: string;
    intro: (il: string) => string;
    faq2: (il: string) => { question: string; answer: string };
    topBrandSlugs: string[];
  }
> = {
  Karadeniz: {
    leadTimeLabel: "1 iş günü",
    intro: (il) =>
      `${il}, Samsun'daki merkezimize coğrafi yakınlığı sayesinde Karadeniz hattındaki en hızlı servis sürelerinden birine sahiptir. Bölgenin yüksek nem oranı robot süpürgelerde sensör ve tekerlek bölgesinde nem birikmesine yol açabildiğinden, periyodik bakım özellikle önemlidir.`,
    faq2: (il) => ({
      question: `${il}'de nem nedeniyle ekstra bir kontrol yapıyor musunuz?`,
      answer:
        "Evet, Karadeniz bölgesinden gelen cihazlarda sensör ve tekerlek bölgesi nem kontrolü standart adımlarımız arasındadır.",
    }),
    topBrandSlugs: ["roborock", "xiaomi", "dreame"],
  },
  Marmara: {
    leadTimeLabel: "1-2 iş günü",
    intro: (il) =>
      `${il}'in yoğun kentsel kullanım yoğunluğu ve halı/parke karışık zemin yapısı, robot süpürgelerde fırça ve tekerlek aşınmasını hızlandırabilir. ${il}'den gelen cihazlar anlaşmalı kargo ile 1-2 iş günü içinde merkezimize ulaşır.`,
    faq2: (il) => ({
      question: `${il}'de yoğun kullanım nedeniyle fırça/tekerlek kontrolü yapıyor musunuz?`,
      answer:
        "Evet, yoğun şehir kullanımının yorduğu fırça ve tekerlek grubunu her onarımda standart olarak kontrol ediyoruz.",
    }),
    topBrandSlugs: ["roborock", "xiaomi", "ecovacs"],
  },
  Ege: {
    leadTimeLabel: "2-3 iş günü",
    intro: (il) =>
      `${il}'nin ılıman ama kıyı kesimlerde nemli iklimi, özellikle yaz aylarında robot süpürgelerin elektronik bileşenlerinde nem kaynaklı arızaları artırabilir; bu bölgeden gelen cihazlarda anakart nem testi standart kontrol adımlarımız arasındadır.`,
    faq2: (il) => ({
      question: `${il}'de nem kaynaklı arıza sık mı görülüyor?`,
      answer:
        "Kıyı kesimlerinde nem kaynaklı elektronik arızalar diğer bölgelere göre biraz daha sık görülüyor; bu nedenle anakart nem testi standart kontrol adımlarımız arasında.",
    }),
    topBrandSlugs: ["ecovacs", "xiaomi", "dyson"],
  },
  Akdeniz: {
    leadTimeLabel: "2-3 iş günü",
    intro: (il) =>
      `${il}'de yaz aylarındaki yüksek sıcaklık ve toz yoğunluğu, robot süpürgelerin filtre ve fan motorlarında tıkanmayı hızlandırabilir; bu bölgeden gelen cihazlarda filtre ve fan kontrolü düzenli bakımımızın standart bir parçasıdır.`,
    faq2: (il) => ({
      question: `${il}'de sıcak havanın cihaza etkisi oluyor mu?`,
      answer:
        "Yüksek sıcaklık ve toz filtre ile fan motorunu yorabilir; bu bölgeden gelen cihazlarda filtre/fan kontrolü standart adımlarımız arasındadır.",
    }),
    topBrandSlugs: ["dreame", "roborock", "viomi"],
  },
  "İç Anadolu": {
    leadTimeLabel: "1-2 iş günü",
    intro: (il) =>
      `${il}'nin kurak iklimi ve toz yoğunluğu, robot süpürgelerin fırça ve filtre bölgelerinde sık tıkanmaya yol açabilir; ayrıca kışın düşük nem, statik elektrik kaynaklı sensör hassasiyetini artırabilir.`,
    faq2: (il) => ({
      question: `${il}'de toz nedeniyle sık arıza oluyor mu?`,
      answer:
        "Kuru ve tozlu iklim fırça ve filtre bölgesinde tıkanmayı hızlandırabilir; bu bölgeden gelen cihazlarda düzenli filtre bakımını öneriyoruz.",
    }),
    topBrandSlugs: ["roborock", "dreame", "irobot"],
  },
  "Doğu Anadolu": {
    leadTimeLabel: "2-4 iş günü",
    intro: (il) =>
      `${il}'nin sert kış şartları ve uzun kış ayları, robot süpürgelerin batarya performansını düşürebilir — düşük sıcaklıklarda lityum bataryaların kapasitesi geçici olarak azalır. Cihazınızı kışın çok soğuk ortamlarda bırakmamanızı öneririz.`,
    faq2: (il) => ({
      question: `${il}'de kışın cihazı nasıl saklamalıyım?`,
      answer:
        "Düşük sıcaklıklar lityum bataryaların kapasitesini geçici olarak azaltabilir; cihazınızı çok soğuk ortamda (ör. camekan kenarı, garaj) bırakmamanızı öneririz.",
    }),
    topBrandSlugs: ["xiaomi", "roborock", "tcl"],
  },
  "Güneydoğu Anadolu": {
    leadTimeLabel: "2-4 iş günü",
    intro: (il) =>
      `${il}'de yaz aylarındaki aşırı sıcaklık, robot süpürgelerin elektronik bileşenlerini ve batarya ömrünü olumsuz etkileyebilir; cihazınızı doğrudan güneş ışığı almayan, serin bir alanda şarj etmenizi öneririz.`,
    faq2: (il) => ({
      question: `${il}'de yaz sıcağı cihaza zarar verir mi?`,
      answer:
        "Aşırı sıcak batarya ömrünü olumsuz etkileyebilir; cihazınızı serin ve gölge bir alanda şarj etmenizi öneririz.",
    }),
    topBrandSlugs: ["xiaomi", "dreame", "roborock"],
  },
};

function shippingFaq(il: string, isHomeBase: boolean) {
  if (isHomeBase) {
    return {
      question: `${il} içinde adresten cihaz alıyor musunuz?`,
      answer:
        "Evet, Samsun merkez ve yakın ilçelerde adresinizden ücretsiz cihaz teslim alma hizmetimiz vardır.",
    };
  }
  return {
    question: `${il}'den Samsun'a gönderim nasıl işliyor?`,
    answer:
      "Servis talebi oluşturduğunuzda size özel bir kargo kodu ve gönderim talimatı iletiyoruz; cihazınızı anlaşmalı kargoya teslim etmeniz yeterlidir.",
  };
}

export interface ProvinceSeed {
  slug: string;
  name: string;
  plateCode: string;
  region: string;
  leadTimeLabel: string;
  regionalIntro: string;
  topBrandSlugs: string; // JSON-encoded string[]
  faqJson: string; // JSON-encoded {question, answer}[]
}

const HOME_BASE_SLUG = "samsun";

export const PROVINCES: ProvinceSeed[] = PROVINCE_TABLE.map((row) => {
  const meta = REGION_META[row.region];
  const isHomeBase = row.slug === HOME_BASE_SLUG;

  return {
    slug: row.slug,
    name: row.name,
    plateCode: row.code,
    region: row.region,
    leadTimeLabel: isHomeBase
      ? "Aynı gün / 1 iş günü (merkezimiz Samsun'da)"
      : meta.leadTimeLabel,
    regionalIntro: isHomeBase
      ? "Samsun Robot Hastanesi'nin merkezi Samsun'da bulunduğu için şehir içi taleplerde aynı gün adresten teslim alma ve hızlı arıza tespiti mümkündür. Karadeniz'in nemli iklimi robot süpürgelerde sensör ve tekerlek bölgesinde nem birikmesine yol açabildiğinden, periyodik bakım özellikle önemlidir."
      : meta.intro(row.name),
    topBrandSlugs: JSON.stringify(meta.topBrandSlugs),
    faqJson: JSON.stringify([shippingFaq(row.name, isHomeBase), meta.faq2(row.name)]),
  };
});
