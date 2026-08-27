/**
 * Extra models, one/two per brand, so every brand (except Grundig - see
 * note at the bottom) has at least one selectable model on the service
 * request form and a model micro-page. These are real, market-known
 * flagship/common models for each brand (same "commonly-published
 * approximations, verify before production" bar as seed.ts's original 5
 * models - see known-issues.md). Deliberately no suctionPa/batteryMah/
 * runtimeMin numbers here (unlike the original 5) since exact published
 * spec sheets were not independently cross-checked for this batch -
 * commonIssues/partsNote only, at the same generic technical level as the
 * existing brand-level fault lists.
 *
 * Grundig has no entry: no specific robot vacuum model name for this
 * brand could be confidently verified from general market knowledge, and
 * this project does not fabricate a model number to fill the gap
 * (see decisions.md).
 */

export interface ExtraModelSeed {
  brandSlug: string;
  slug: string;
  name: string;
  commonIssues: string; // JSON-encoded {title, description}[]
  partsNote: string;
}

function issues(list: { title: string; description: string }[]): string {
  return JSON.stringify(list);
}

export const EXTRA_MODELS: ExtraModelSeed[] = [
  // --- Core brands: one extra flagship model each ---
  {
    brandSlug: "roborock",
    slug: "s8-pro-ultra",
    name: "Roborock S8 Pro Ultra",
    commonIssues: issues([
      { title: "Otomatik yıkama/kurutma istasyonu arızası", description: "İstasyonun mop yıkama veya sıcak hava kurutma fonksiyonu çalışmıyorsa pompa, hortum veya ısıtıcı kontrolü gerekir." },
      { title: "Kaldırılabilir mop modülü arızası", description: "Halıya geçişte mop otomatik kalkmıyorsa kaldırma mekanizması onarımı gerekebilir." },
    ]),
    partsNote: "S8 Pro Ultra için istasyon pompası, mop kaldırma mekanizması ve batarya paketi orijinal eşdeğeri olarak temin edilir.",
  },
  {
    brandSlug: "xiaomi",
    slug: "x10-plus",
    name: "Xiaomi Robot Vacuum X10+",
    commonIssues: issues([
      { title: "Otomatik toz boşaltma istasyonu arızası", description: "İstasyon toz haznesini boşaltmıyorsa hortum tıkanıklığı veya istasyon motoru kontrolü gerekir." },
    ]),
    partsNote: "X10+ için istasyon torbası mekanizması, ana fırça ve batarya paketi yedek parça olarak temin edilir.",
  },
  {
    brandSlug: "dreame",
    slug: "l10s-ultra",
    name: "Dreame L10s Ultra",
    commonIssues: issues([
      { title: "Otomatik mop yıkama/kurutma arızası", description: "İstasyonun sıcak su ile yıkama veya kurutma fonksiyonu çalışmazsa pompa ve ısıtıcı devresi kontrol edilir." },
    ]),
    partsNote: "L10s Ultra istasyon pompası, hortum seti ve robot bataryası ayrı ayrı temin edilebilir.",
  },

  // --- Brands with no models yet ---
  {
    brandSlug: "ecovacs",
    slug: "x1-omni",
    name: "Ecovacs Deebot X1 Omni",
    commonIssues: issues([
      { title: "Omni istasyonu boşaltma/yıkama arızası", description: "Çok fonksiyonlu istasyonda toz boşaltma veya mop yıkama basamağı çalışmazsa istasyon motoru/pompası kontrol edilir." },
    ]),
    partsNote: "X1 Omni için istasyon parçaları ve batarya paketi orijinal eşdeğeri olarak temin edilir.",
  },
  {
    brandSlug: "ecovacs",
    slug: "t10-plus",
    name: "Ecovacs Deebot T10 Plus",
    commonIssues: issues([
      { title: "OZMO titreşimli mop motoru arızası", description: "Titreşimli paspaslama sisteminde motor arızası paspaslama gücünü azaltır." },
    ]),
    partsNote: "T10 Plus için mop motoru ve batarya paketi stoklarımızda mevcuttur.",
  },
  {
    brandSlug: "irobot",
    slug: "j7-plus",
    name: "iRobot Roomba j7+",
    commonIssues: issues([
      { title: "Clean Base otomatik boşaltma arızası", description: "Home Base/Clean Base istasyonu toz haznesini boşaltmıyorsa hortum veya istasyon motoru kontrolü gerekir." },
    ]),
    partsNote: "j7+ için istasyon torbası mekanizması ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "irobot",
    slug: "combo-j9-plus",
    name: "iRobot Roomba Combo j9+",
    commonIssues: issues([
      { title: "Kendini kaldıran mop pedi arızası", description: "Halıda mop pedini otomatik kaldıran mekanizma arızalanırsa halı üzerinde nem kalabilir." },
    ]),
    partsNote: "Combo j9+ için mop kaldırma mekanizması ve batarya paketi orijinal eşdeğeri temin edilir.",
  },
  {
    brandSlug: "dyson",
    slug: "360-vis-nav",
    name: "Dyson 360 Vis Nav",
    commonIssues: issues([
      { title: "360° kamera navigasyon hatası", description: "Üstteki 360° kamera modülü kirlenir veya arızalanırsa haritalama bozulur." },
    ]),
    partsNote: "360 Vis Nav için kamera modülü ve batarya paketi yedek parça olarak temin edilir.",
  },
  {
    brandSlug: "dyson",
    slug: "360-heurist",
    name: "Dyson 360 Heurist",
    commonIssues: issues([
      { title: "Emiş gücü düşüşü", description: "Filtre tıkanıklığı veya fan motoru yıpranması emiş performansını azaltabilir." },
    ]),
    partsNote: "360 Heurist için filtre seti, fan motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "tcl",
    slug: "sweeva-6000",
    name: "TCL Sweeva 6000",
    commonIssues: issues([
      { title: "Navigasyon kamerası bulanıklığı", description: "Kamera lensinin kirlenmesi haritalama hatalarına yol açabilir." },
    ]),
    partsNote: "Sweeva 6000 için batarya paketi ve ana fırça temin edilebilir.",
  },
  {
    brandSlug: "tcl",
    slug: "sweeva-3000",
    name: "TCL Sweeva 3000",
    commonIssues: issues([
      { title: "Şarj teması sorunu", description: "Dock pinlerindeki oksitlenme şarj olmama şikayetine yol açar." },
    ]),
    partsNote: "Sweeva 3000 için batarya paketi ve dock temas pini temin edilebilir.",
  },
  {
    brandSlug: "eufy",
    slug: "robovac-11s",
    name: "Eufy RoboVac 11S",
    commonIssues: issues([
      { title: "Sessiz motorun gürültülü çalışması", description: "Fan motorunda aşınma, karakteristik sessiz çalışmayı bozabilir." },
    ]),
    partsNote: "RoboVac 11S için fan motoru ve batarya paketi orijinal eşdeğeri temin edilir.",
  },
  {
    brandSlug: "eufy",
    slug: "robovac-x8",
    name: "Eufy RoboVac X8",
    commonIssues: issues([
      { title: "Çift dönen fırça arızası", description: "Twin-Turbine çift fırça sisteminde motor veya fırça aşınması emiş performansını düşürür." },
    ]),
    partsNote: "RoboVac X8 için fırça seti ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "narwal",
    slug: "freo",
    name: "Narwal Freo",
    commonIssues: issues([
      { title: "Paspas yıkama istasyonu arızası", description: "Kendi kendini yıkama mekanizmasında pompa veya hortum tıkanıklığı görülebilir." },
    ]),
    partsNote: "Freo için istasyon pompası ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "narwal",
    slug: "freo-x",
    name: "Narwal Freo X",
    commonIssues: issues([
      { title: "Sıcak hava kurutma modülü arızası", description: "İstasyonun kurutma fanı arızalandığında paspaslar nemli kalabilir." },
    ]),
    partsNote: "Freo X için istasyon kurutma fanı ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "cecotec",
    slug: "conga-3090",
    name: "Cecotec Conga 3090",
    commonIssues: issues([
      { title: "Fırça motoru tıkanıklığı", description: "Saç ve tüy birikimi motoru zorlayarak arızaya yol açabilir." },
    ]),
    partsNote: "Conga 3090 için fırça motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "cecotec",
    slug: "conga-4090",
    name: "Cecotec Conga 4090",
    commonIssues: issues([
      { title: "Conga serisi haritalama hatası", description: "LiDAR veya jiroskop kalibrasyonu bozulduğunda robot odaları karıştırabilir." },
    ]),
    partsNote: "Conga 4090 için LiDAR modülü ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "proscenic",
    slug: "m8-pro",
    name: "Proscenic M8 Pro",
    commonIssues: issues([
      { title: "Lazer navigasyon sensörü hatası", description: "LDS modülünün kirlenmesi veya arızalanması haritalamayı bozar." },
    ]),
    partsNote: "M8 Pro için LDS modülü ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "proscenic",
    slug: "850p",
    name: "Proscenic 850P",
    commonIssues: issues([
      { title: "Mop pompası arızası", description: "Paspaslama modunda su akışı düzensizleşebilir." },
    ]),
    partsNote: "850P için mop pompası ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "samsung",
    slug: "jet-bot-ai-plus",
    name: "Samsung Jet Bot AI+",
    commonIssues: issues([
      { title: "Akıllı ev bağlantı sorunu", description: "SmartThings uygulamasıyla senkronizasyon kopabilir; genellikle Wi-Fi modülü veya firmware kaynaklıdır." },
    ]),
    partsNote: "Jet Bot AI+ için Wi-Fi modülü ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "samsung",
    slug: "jet-bot-90-ai",
    name: "Samsung Jet Bot 90 AI",
    commonIssues: issues([
      { title: "Navigasyon kamerası arızası", description: "Görüntü tabanlı navigasyon sensörünün arızalanması haritalamayı etkiler." },
    ]),
    partsNote: "Jet Bot 90 AI için kamera modülü ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "philips",
    slug: "smartpro-easy",
    name: "Philips SmartPro Easy",
    commonIssues: issues([
      { title: "Tekerlek motoru arızası", description: "Tekerlek grubundaki motor arızası hareket sorunlarına yol açar." },
    ]),
    partsNote: "SmartPro Easy için tekerlek motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "philips",
    slug: "smartpro-compact",
    name: "Philips SmartPro Compact",
    commonIssues: issues([
      { title: "Sensör kirliliği", description: "Düşme/çarpma sensörlerinin temizliği düzenli bakım gerektirir." },
    ]),
    partsNote: "SmartPro Compact için sensör ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "karcher",
    slug: "rc-3",
    name: "Kärcher RC 3",
    commonIssues: issues([
      { title: "Emiş motoru arızası", description: "Güçlü emiş sistemine özgü fan motoru zamanla yıpranabilir." },
    ]),
    partsNote: "RC 3 için fan motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "karcher",
    slug: "rc-4",
    name: "Kärcher RC 4",
    commonIssues: issues([
      { title: "Fırça sistemi tıkanıklığı", description: "Saç/tüy birikimi fırça dönüşünü engelleyebilir." },
    ]),
    partsNote: "RC 4 için fırça seti ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "roidmi",
    slug: "eve-plus",
    name: "Roidmi Eve Plus",
    commonIssues: issues([
      { title: "Otomatik toz boşaltma istasyonu arızası", description: "İstasyon toz haznesini boşaltmıyorsa hortum veya motor kontrolü gerekir." },
    ]),
    partsNote: "Eve Plus için istasyon parçaları ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "roidmi",
    slug: "eve",
    name: "Roidmi Eve",
    commonIssues: issues([
      { title: "Navigasyon sensörü hatası", description: "LiDAR veya jiroskop sensöründeki arıza haritalamayı bozar." },
    ]),
    partsNote: "Eve için navigasyon modülü ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "viomi",
    slug: "v3",
    name: "Viomi V3",
    commonIssues: issues([
      { title: "Çift tank sistemi arızası", description: "Ayrı temiz/kirli su tankı sisteminde pompa veya valf arızası görülebilir." },
    ]),
    partsNote: "V3 için su pompası ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "viomi",
    slug: "alpha",
    name: "Viomi Alpha",
    commonIssues: issues([
      { title: "Otomatik boşaltma istasyonu arızası", description: "İstasyon toz haznesini boşaltmıyorsa hortum tıkanıklığı olabilir." },
    ]),
    partsNote: "Alpha için istasyon parçaları ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "hoover",
    slug: "h-free-500-robot",
    name: "Hoover H-Free 500 Robot",
    commonIssues: issues([
      { title: "Emiş gücü düşüşü", description: "Filtre tıkanıklığı veya fan motoru yıpranması emiş performansını azaltabilir." },
    ]),
    partsNote: "H-Free 500 Robot için filtre ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "hoover",
    slug: "rc70",
    name: "Hoover RC70",
    commonIssues: issues([
      { title: "Fırça motoru arızası", description: "Ana fırçaya dolanan saç/tüy motoru zorlayabilir." },
    ]),
    partsNote: "RC70 için fırça motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "panasonic",
    slug: "rulo-mc-rs1",
    name: "Panasonic RULO MC-RS1",
    commonIssues: issues([
      { title: "V şeklinde fırça sistemi arızası", description: "RULO'ya özgü V şeklindeki fırça mekanizmasında tıkanma veya motor arızası olabilir." },
    ]),
    partsNote: "MC-RS1 için V fırça seti ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "panasonic",
    slug: "rulo-mc-rsf1000",
    name: "Panasonic RULO MC-RSF1000",
    commonIssues: issues([
      { title: "Sensör kalibrasyon hatası", description: "Navigasyon sensörlerinin kalibrasyonu bozulduğunda haritalama hataları oluşur." },
    ]),
    partsNote: "MC-RSF1000 için sensör modülü ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "midea",
    slug: "m7",
    name: "Midea M7",
    commonIssues: issues([
      { title: "Navigasyon sensörü hatası", description: "LiDAR veya kamera tabanlı navigasyon sensöründeki arıza haritalamayı etkiler." },
    ]),
    partsNote: "M7 için navigasyon modülü ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "midea",
    slug: "s8",
    name: "Midea S8",
    commonIssues: issues([
      { title: "Fırça motoru tıkanıklığı", description: "Saç/tüy birikimi ana fırça motorunu zorlayabilir." },
    ]),
    partsNote: "S8 için fırça motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "tefal",
    slug: "explorer-serie-60",
    name: "Tefal Explorer Serie 60",
    commonIssues: issues([
      { title: "Navigasyon sapması", description: "Jiroskop veya sensör kalibrasyonu bozulduğunda robot düzensiz hareket edebilir." },
    ]),
    partsNote: "Explorer Serie 60 için sensör modülü ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "tefal",
    slug: "explorer-serie-40",
    name: "Tefal Explorer Serie 40",
    commonIssues: issues([
      { title: "Fırça motoru arızası", description: "Ana fırça motorunun aşınması emiş performansını düşürür." },
    ]),
    partsNote: "Explorer Serie 40 için fırça motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "rowenta",
    slug: "x-plorer-serie-60",
    name: "Rowenta X-plorer Serie 60",
    commonIssues: issues([
      { title: "Emiş gücü düşüşü", description: "Filtre tıkanıklığı veya fan motoru yıpranması performansı etkileyebilir." },
    ]),
    partsNote: "X-plorer Serie 60 için filtre ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "rowenta",
    slug: "x-plorer-serie-20",
    name: "Rowenta X-plorer Serie 20",
    commonIssues: issues([
      { title: "Tekerlek motoru arızası", description: "Tekerlek grubundaki arıza hareket sorunlarına yol açar." },
    ]),
    partsNote: "X-plorer Serie 20 için tekerlek motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "shark",
    slug: "ai-ultra",
    name: "Shark AI Ultra",
    commonIssues: issues([
      { title: "AI navigasyon sensörü hatası", description: "Görüntü/nesne tanıma sensöründeki arıza haritalamayı ve engel algılamayı etkiler." },
    ]),
    partsNote: "AI Ultra için navigasyon modülü ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "shark",
    slug: "matrix-plus",
    name: "Shark Matrix Plus",
    commonIssues: issues([
      { title: "Kendi kendini boşaltan istasyon arızası", description: "Otomatik boşaltma istasyonunda tıkanıklık görülebilir." },
    ]),
    partsNote: "Matrix Plus için istasyon parçaları ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "neabot",
    slug: "nomo-q11",
    name: "Neabot NoMo Q11",
    commonIssues: issues([
      { title: "Otomatik boşaltma istasyonu arızası", description: "Toz haznesini boşaltma mekanizmasında hortum tıkanıklığı veya motor arızası görülebilir." },
    ]),
    partsNote: "NoMo Q11 için istasyon hortumu ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "neabot",
    slug: "nomo-q11-pro",
    name: "Neabot NoMo Q11 Pro",
    commonIssues: issues([
      { title: "Fırça motoru arızası", description: "Ana fırça motorunun aşınması emiş performansını düşürür." },
    ]),
    partsNote: "NoMo Q11 Pro için fırça motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "mova",
    slug: "p50",
    name: "MOVA P50",
    commonIssues: issues([
      { title: "Yüksek emiş modunda ısınma", description: "Güçlü emiş performansı fan motorunda erken yıpranmaya yol açabilir." },
    ]),
    partsNote: "P50 için fan motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "mova",
    slug: "p10",
    name: "MOVA P10",
    commonIssues: issues([
      { title: "Mop sistemi arızası", description: "Su akış valfindeki arıza paspaslama performansını düşürür." },
    ]),
    partsNote: "P10 için su valfi ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "lefant",
    slug: "m1",
    name: "Lefant M1",
    commonIssues: issues([
      { title: "Tekerlek motoru arızası", description: "Kompakt gövdedeki tekerlek motorları zamanla aşınabilir." },
    ]),
    partsNote: "M1 için tekerlek motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "lefant",
    slug: "t1-pro",
    name: "Lefant T1 Pro",
    commonIssues: issues([
      { title: "Sensör kirliliği", description: "Düşme/çarpma sensörlerinin temizliği düzenli bakım gerektirir." },
    ]),
    partsNote: "T1 Pro için sensör ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "ilife",
    slug: "a4s",
    name: "ILIFE A4s",
    commonIssues: issues([
      { title: "Fırça motoru tıkanıklığı", description: "Saç/tüy birikimi ana fırça motorunu zorlayabilir." },
    ]),
    partsNote: "A4s için fırça motoru ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "ilife",
    slug: "v3s-pro",
    name: "ILIFE V3s Pro",
    commonIssues: issues([
      { title: "Sensör arızası", description: "Düşme ve çarpma sensörlerinin arızalanması navigasyonu etkiler." },
    ]),
    partsNote: "V3s Pro için sensör ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "miele",
    slug: "scout-rx2-home-vision",
    name: "Miele Scout RX2 Home Vision",
    commonIssues: issues([
      { title: "Anakart/elektronik arıza", description: "Premium segmentteki hassas elektronik kartlarda mikro lehim seviyesinde onarım gerekebilir." },
    ]),
    partsNote: "Scout RX2 Home Vision için anakart onarımı ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "miele",
    slug: "scout-rx3",
    name: "Miele Scout RX3",
    commonIssues: issues([
      { title: "Navigasyon sensörü hatası", description: "Kamera veya LiDAR tabanlı sensördeki arıza haritalamayı etkiler." },
    ]),
    partsNote: "Scout RX3 için navigasyon modülü ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "vorwerk",
    slug: "kobold-vr300",
    name: "Vorwerk Kobold VR300",
    commonIssues: issues([
      { title: "Kobold VR anakart arızası", description: "Premium segmentteki elektronik kartlarda mikro lehim seviyesinde onarım gerekebilir." },
    ]),
    partsNote: "Kobold VR300 için anakart onarımı ve batarya paketi temin edilebilir.",
  },
  {
    brandSlug: "vorwerk",
    slug: "kobold-vr200",
    name: "Vorwerk Kobold VR200",
    commonIssues: issues([
      { title: "Navigasyon sensörü hatası", description: "Sensör kalibrasyonu bozulduğunda haritalama hataları oluşur." },
    ]),
    partsNote: "Kobold VR200 için sensör modülü ve batarya paketi temin edilebilir.",
  },
];
