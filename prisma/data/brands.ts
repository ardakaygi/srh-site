/**
 * Expanded, real robot-vacuum brand roster. Every brand here is a genuine,
 * known manufacturer/marketer of robot vacuums (verified against this
 * session's research and general market knowledge) - none are invented to
 * pad a count. Reaching MASTER_PROMPT.md's "70+" target requires a brand
 * catalog verified against the business's actual supplier/import list,
 * which is a data-sourcing task tracked in backlog.md, not something to
 * fabricate here.
 */

export interface BrandSeed {
  slug: string;
  name: string;
  intro: string;
  faultsJson: string; // JSON-encoded {title, description}[]
  faqJson: string; // JSON-encoded {question, answer}[]
}

export const EXTRA_BRANDS: BrandSeed[] = [
  {
    slug: "tcl",
    name: "TCL",
    intro:
      "TCL, ekran ve görüntü teknolojisindeki köklü deneyimini robot süpürgelerin navigasyon kameralarına da taşıyor. Samsun Robot Hastanesi olarak TCL robot süpürgelerde kamera tabanlı navigasyon ve batarya arızalarına teknik çözüm sunuyoruz.",
    faultsJson: JSON.stringify([
      { title: "Navigasyon kamerası bulanıklığı", description: "Kamera lensinin buğulanması veya kirlenmesi haritalama hatalarına yol açabilir." },
      { title: "Şarj teması sorunu", description: "Dock pinlerindeki oksitlenme şarj olmama şikayetine neden olur." },
      { title: "Batarya ömrü sonu", description: "Çalışma süresinin kısalması genellikle batarya hücrelerinin yenilenmesini gerektirir." },
      { title: "Wi-Fi bağlantı kopması", description: "Uygulama bağlantısı sık kopuyorsa Wi-Fi modülü kontrolü yapılır." },
    ]),
    faqJson: JSON.stringify([{ question: "TCL robot süpürgemin garantisi yok, yine de bakabilir misiniz?", answer: "Evet, garanti dışı TCL cihazlarında da ücretsiz arıza tespiti yapıyoruz." }]),
  },
  {
    slug: "eufy",
    name: "Anker Eufy",
    intro:
      "Anker'ın Eufy serisi, kompakt tasarımı ve sessiz çalışmasıyla tanınır. Samsun Robot Hastanesi'nde Eufy'nin RoboVac serisinde motor, sensör ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Sessiz motorun gürültülü çalışması", description: "Fan motorunda aşınma, karakteristik sessiz çalışmayı bozabilir." },
      { title: "İnfrared sensör kirliliği", description: "Kompakt gövdedeki sensörler kolay kirlenir, düzenli temizlik gerektirir." },
      { title: "Dock hizalama sorunu", description: "Küçük gövde tasarımı dock'a hizalanmada hassasiyet ister; hizalama sensörü arızası şarj sorununa yol açar." },
      { title: "Batarya değişimi", description: "Kompakt gövdeye uygun ölçekte özel batarya paketi üretiyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Eufy RoboVac modelim için orijinal yedek parça var mı?", answer: "Evet, kompakt gövdeye uygun orijinal eşdeğeri yedek parça temin ediyoruz." }]),
  },
  {
    slug: "narwal",
    name: "Narwal",
    intro:
      "Narwal, kendi kendini yıkayan paspas istasyonu teknolojisiyle öne çıkan bir marka. Samsun Robot Hastanesi'nde Narwal'ın istasyon ve robot gövdesi arızalarına teknik servis veriyoruz.",
    faultsJson: JSON.stringify([
      { title: "Paspas yıkama istasyonu arızası", description: "Kendi kendini yıkama mekanizmasında pompa veya hortum tıkanıklığı görülebilir." },
      { title: "Sıcak hava kurutma modülü arızası", description: "İstasyonun kurutma fanı arızalandığında paspaslar nemli kalabilir." },
      { title: "Navigasyon sapması", description: "LiDAR veya kamera hizalama sorunları haritalama hatasına yol açar." },
      { title: "Batarya değişimi", description: "Orijinal hücrelerle spot kaynaklı batarya paketi üretimi yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Narwal istasyonunu da tamir ediyor musunuz?", answer: "Evet, robot gövdesinin yanı sıra kendi kendini yıkama istasyonuna da teknik servis veriyoruz." }]),
  },
  {
    slug: "cecotec",
    name: "Cecotec",
    intro:
      "İspanyol üretici Cecotec, Conga serisiyle Avrupa ve Türkiye pazarında yaygın olarak bulunur. Samsun Robot Hastanesi'nde Cecotec Conga modellerinde sensör, motor ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Conga serisi haritalama hatası", description: "LiDAR veya jiroskop kalibrasyonu bozulduğunda robot odaları karıştırabilir." },
      { title: "Fırça motoru tıkanıklığı", description: "Saç ve tüy birikimi motoru zorlayarak arızaya yol açabilir." },
      { title: "Şarj istasyonu teması", description: "Dock pinlerinde temas kaybı şarj olmama şikayeti yaratır." },
      { title: "Batarya değişimi", description: "Conga serisi için orijinal eşdeğeri batarya paketi üretiyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Cecotec Conga modelim için parça bulmak zor mu?", answer: "Hayır, Conga serisi için orijinal eşdeğeri yedek parçaları stoklarımızda bulunduruyoruz." }]),
  },
  {
    slug: "proscenic",
    name: "Proscenic",
    intro:
      "Proscenic, uygun fiyatlı ve güçlü navigasyon sistemleriyle tanınan bir marka. Samsun Robot Hastanesi'nde Proscenic modellerinde sensör, motor ve yazılım kaynaklı arızalara çözüm sunuyoruz.",
    faultsJson: JSON.stringify([
      { title: "Lazer navigasyon sensörü hatası", description: "LDS modülünün kirlenmesi veya arızalanması haritalamayı bozar." },
      { title: "Mop pompası arızası", description: "Paspaslama modunda su akışı düzensizleşebilir." },
      { title: "Uygulama bağlantı sorunu", description: "Firmware güncellemesi veya Wi-Fi modülü kontrolü gerekebilir." },
      { title: "Batarya ömrü sonu", description: "Çalışma süresi kısaldığında batarya paketi yenilenir." },
    ]),
    faqJson: JSON.stringify([{ question: "Proscenic robot süpürgem için ücretsiz arıza tespiti yapıyor musunuz?", answer: "Evet, cihazınız elimize ulaştıktan sonra ücretsiz arıza tespiti yapıp size teklif sunuyoruz." }]),
  },
  {
    slug: "samsung",
    name: "Samsung",
    intro:
      "Samsung'un Jet Bot serisi, akıllı ev ekosistemiyle entegre çalışabilen robot süpürgeler sunar. Samsun Robot Hastanesi'nde Samsung Jet Bot modellerinde elektronik ve motor onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Akıllı ev bağlantı sorunu", description: "SmartThings uygulamasıyla senkronizasyon kopabilir; genellikle Wi-Fi modülü veya firmware kaynaklıdır." },
      { title: "Navigasyon kamerası arızası", description: "Görüntü tabanlı navigasyon sensörünün arızalanması haritalamayı etkiler." },
      { title: "Fırça motoru arızası", description: "Ana fırça motorunun aşınması emiş performansını düşürür." },
      { title: "Batarya değişimi", description: "Orijinal hücrelerle batarya paketi yenileme hizmeti sunuyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Samsung Jet Bot'umun SmartThings bağlantısını da kontrol ediyor musunuz?", answer: "Evet, elektronik arıza tespiti sırasında akıllı ev bağlantı sorunlarını da kontrol ediyoruz." }]),
  },
  {
    slug: "philips",
    name: "Philips",
    intro:
      "Philips, dayanıklı ve sade tasarımıyla bilinen bir ev aletleri markasıdır. Samsun Robot Hastanesi'nde Philips robot süpürgelerde motor, sensör ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Tekerlek motoru arızası", description: "Tekerlek grubundaki motor arızası hareket sorunlarına yol açar." },
      { title: "Şarj devresi arızası", description: "Şarj olmama şikayetlerinin bir kısmı şarj devresi kartından kaynaklanır." },
      { title: "Sensör kirliliği", description: "Düşme/çarpma sensörlerinin temizliği düzenli bakım gerektirir." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Philips robot süpürgem için orijinal parça buluyor musunuz?", answer: "Evet, orijinal veya orijinal eşdeğeri sertifikalı yedek parça kullanıyoruz." }]),
  },
  {
    slug: "karcher",
    name: "Karcher",
    intro:
      "Temizlik ekipmanları konusunda uzmanlaşmış Karcher, RC serisi robot süpürgeleriyle de bilinir. Samsun Robot Hastanesi'nde Karcher RC serisinde motor ve elektronik onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Emiş motoru arızası", description: "Karcher'ın güçlü emiş sistemine özgü fan motoru zamanla yıpranabilir." },
      { title: "Fırça sistemi tıkanıklığı", description: "Saç/tüy birikimi fırça dönüşünü engelleyebilir." },
      { title: "Dock bağlantı sorunu", description: "Şarj istasyonu teması kontrol edilmesi gereken yaygın arızalardandır." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketi üretip değişimini yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Karcher RC serim için teknik destek veriyor musunuz?", answer: "Evet, RC serisinin tüm modellerinde teknik servis desteği sunuyoruz." }]),
  },
  {
    slug: "roidmi",
    name: "Roidmi",
    intro:
      "Roidmi, kompakt ve hafif tasarımıyla öne çıkan bir Çin menşeli markadır. Samsun Robot Hastanesi'nde Roidmi modellerinde sensör, motor ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Hafif gövde tekerlek arızası", description: "Kompakt tasarımdaki tekerlek motorları zamanla aşınabilir." },
      { title: "Navigasyon sensörü hatası", description: "LiDAR veya jiroskop sensöründeki arıza haritalamayı bozar." },
      { title: "Mop sistemi arızası", description: "Su akış valfindeki arıza paspaslama performansını etkiler." },
      { title: "Batarya değişimi", description: "Kompakt gövdeye uygun batarya paketi üretiyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Roidmi robot süpürgem için yedek parça buluyor musunuz?", answer: "Evet, Roidmi modelleri için orijinal eşdeğeri yedek parça temin ediyoruz." }]),
  },
  {
    slug: "viomi",
    name: "Viomi",
    intro:
      "Viomi, Xiaomi ekosistemine yakın çalışan, çoklu yüzey temizliğine odaklanan bir markadır. Samsun Robot Hastanesi'nde Viomi modellerinde motor, sensör ve yazılım onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Çift tank sistemi arızası", description: "Ayrı temiz/kirli su tankı sisteminde pompa veya valf arızası görülebilir." },
      { title: "Navigasyon sapması", description: "LDS sensörü kalibrasyonu bozulduğunda haritalama hataları oluşur." },
      { title: "Wi-Fi bağlantı sorunu", description: "Uygulama bağlantı kopmaları genelde firmware güncellemesiyle çözülür." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketi ile değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Viomi robot süpürgemin çift tank sistemini de onarıyor musunuz?", answer: "Evet, çift tank su sistemindeki pompa ve valf arızalarına da teknik servis veriyoruz." }]),
  },
  {
    slug: "hoover",
    name: "Hoover",
    intro:
      "Elektrikli süpürge pazarının köklü isimlerinden Hoover, robot süpürge segmentinde de ürün sunar. Samsun Robot Hastanesi'nde Hoover robot süpürgelerde motor ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Emiş gücü düşüşü", description: "Filtre tıkanıklığı veya fan motoru yıpranması emiş performansını azaltabilir." },
      { title: "Fırça motoru arızası", description: "Ana fırçaya dolanan saç/tüy motoru zorlayabilir." },
      { title: "Şarj devresi arızası", description: "Şarj olmama şikayetleri dock veya devre kartı kaynaklı olabilir." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Hoover robot süpürgem eski model, yine de parça buluyor musunuz?", answer: "Çoğu model için orijinal eşdeğeri yedek parça temin edebiliyoruz; cihazınızın model bilgisini paylaşmanız yeterli." }]),
  },
  {
    slug: "panasonic",
    name: "Panasonic",
    intro:
      "Panasonic'in RULO serisi, Japon mühendisliğiyle üretilen robot süpürgeler sunar. Samsun Robot Hastanesi'nde Panasonic RULO modellerinde elektronik ve motor onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "V şeklinde fırça sistemi arızası", description: "RULO'ya özgü V şeklindeki fırça mekanizmasında tıkanma veya motor arızası olabilir." },
      { title: "Sensör kalibrasyon hatası", description: "Navigasyon sensörlerinin kalibrasyonu bozulduğunda haritalama hataları oluşur." },
      { title: "Şarj teması sorunu", description: "Dock pinlerindeki temas kaybı şarj olmama şikayetine yol açar." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Panasonic RULO modelim için teknik servis veriyor musunuz?", answer: "Evet, RULO serisinin tüm modellerinde teknik servis desteği sunuyoruz." }]),
  },
  {
    slug: "midea",
    name: "Midea",
    intro:
      "Büyük ev aletleri devi Midea, M-Smart serisiyle robot süpürge pazarında da yer alır. Samsun Robot Hastanesi'nde Midea modellerinde motor, sensör ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Navigasyon sensörü hatası", description: "LiDAR veya kamera tabanlı navigasyon sensöründeki arıza haritalamayı etkiler." },
      { title: "Fırça motoru tıkanıklığı", description: "Saç/tüy birikimi ana fırça motorunu zorlayabilir." },
      { title: "Uygulama bağlantı sorunu", description: "M-Smart uygulaması ile bağlantı kopmaları Wi-Fi modülü kontrolü gerektirebilir." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Midea robot süpürgem için ücretsiz arıza tespiti yapıyor musunuz?", answer: "Evet, cihazınız elimize ulaştıktan sonra ücretsiz arıza tespiti yapıyoruz." }]),
  },
  {
    slug: "tefal",
    name: "Tefal",
    intro:
      "Fransız küçük ev aletleri markası Tefal, Explorer serisiyle robot süpürge segmentinde yer alır. Samsun Robot Hastanesi'nde Tefal Explorer modellerinde motor ve sensör onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Navigasyon sapması", description: "Jiroskop veya sensör kalibrasyonu bozulduğunda robot düzensiz hareket edebilir." },
      { title: "Fırça motoru arızası", description: "Ana fırça motorunun aşınması emiş performansını düşürür." },
      { title: "Şarj istasyonu sorunu", description: "Dock teması veya şarj devresi arızası şarj olmama şikayetine yol açar." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Tefal Explorer modelim için parça buluyor musunuz?", answer: "Evet, Explorer serisi için orijinal eşdeğeri yedek parça temin ediyoruz." }]),
  },
  {
    slug: "rowenta",
    name: "Rowenta",
    intro:
      "Groupe SEB çatısı altında Tefal'ın kardeş markası olan Rowenta, X-Plorer serisiyle robot süpürge sunar. Samsun Robot Hastanesi'nde Rowenta modellerinde motor ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Emiş gücü düşüşü", description: "Filtre tıkanıklığı veya fan motoru yıpranması performansı etkileyebilir." },
      { title: "Tekerlek motoru arızası", description: "Tekerlek grubundaki arıza hareket sorunlarına yol açar." },
      { title: "Şarj devresi arızası", description: "Şarj olmama şikayetleri devre kartı kontrolü gerektirebilir." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Rowenta X-Plorer modelim için teknik servis var mı?", answer: "Evet, X-Plorer serisinin tüm modellerinde teknik servis desteği sunuyoruz." }]),
  },
  {
    slug: "shark",
    name: "Shark",
    intro:
      "ABD pazarında güçlü bir konuma sahip Shark, yapay zeka destekli navigasyon sistemleriyle bilinir. Samsun Robot Hastanesi'nde Shark modellerinde sensör ve motor onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "AI navigasyon sensörü hatası", description: "Görüntü/nesne tanıma sensöründeki arıza haritalamayı ve engel algılamayı etkiler." },
      { title: "Kendi kendini boşaltan istasyon arızası", description: "Bazı modellerdeki otomatik boşaltma istasyonunda tıkanıklık görülebilir." },
      { title: "Fırça motoru arızası", description: "Ana fırça motorunun aşınması emiş performansını düşürür." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Shark robot süpürgemin boşaltma istasyonunu da tamir ediyor musunuz?", answer: "Evet, robot gövdesinin yanı sıra otomatik boşaltma istasyonuna da teknik servis veriyoruz." }]),
  },
  {
    slug: "grundig",
    name: "Grundig",
    intro:
      "Türkiye'de yaygın bilinen Alman kökenli marka Grundig, robot süpürge segmentinde de ürün sunar. Samsun Robot Hastanesi'nde Grundig modellerinde motor, sensör ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Navigasyon sensörü hatası", description: "Sensör kirliliği veya arızası haritalama sorunlarına yol açabilir." },
      { title: "Fırça motoru tıkanıklığı", description: "Saç/tüy birikimi motoru zorlayarak arızaya yol açabilir." },
      { title: "Şarj teması sorunu", description: "Dock pinlerindeki temas kaybı şarj olmama şikayeti yaratır." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Grundig robot süpürgem için Türkiye genelinde servis veriyor musunuz?", answer: "Evet, Türkiye'nin 81 iline anlaşmalı kargo ile hizmet veriyoruz." }]),
  },
  {
    slug: "neabot",
    name: "Neabot",
    intro:
      "Neabot, kendi kendini boşaltan istasyon teknolojisiyle bilinen bir Çin menşeli markadır. Samsun Robot Hastanesi'nde Neabot modellerinde istasyon ve robot gövdesi onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Otomatik boşaltma istasyonu arızası", description: "Toz haznesini boşaltma mekanizmasında hortum tıkanıklığı veya motor arızası görülebilir." },
      { title: "Fırça motoru arızası", description: "Ana fırça motorunun aşınması emiş performansını düşürür." },
      { title: "Navigasyon sapması", description: "Sensör kalibrasyonu bozulduğunda haritalama hataları oluşur." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Neabot istasyonunu da tamir ediyor musunuz?", answer: "Evet, robot gövdesinin yanı sıra otomatik boşaltma istasyonuna da teknik servis veriyoruz." }]),
  },
  {
    slug: "mova",
    name: "MOVA",
    intro:
      "MOVA, yüksek emiş gücü ve gelişmiş haritalama teknolojisiyle öne çıkan bir markadır. Samsun Robot Hastanesi'nde MOVA modellerinde motor, sensör ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Yüksek emiş modunda ısınma", description: "Güçlü emiş performansı fan motorunda erken yıpranmaya yol açabilir." },
      { title: "Navigasyon sensörü hatası", description: "LiDAR veya kamera tabanlı sensördeki arıza haritalamayı etkiler." },
      { title: "Mop sistemi arızası", description: "Su akış valfindeki arıza paspaslama performansını düşürür." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "MOVA robot süpürgem için orijinal parça buluyor musunuz?", answer: "Evet, MOVA modelleri için orijinal eşdeğeri yedek parça temin ediyoruz." }]),
  },
  {
    slug: "lefant",
    name: "Lefant",
    intro:
      "Lefant, bütçe dostu fiyatı ve kompakt tasarımıyla tercih edilen bir markadır. Samsun Robot Hastanesi'nde Lefant modellerinde motor, sensör ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Tekerlek motoru arızası", description: "Kompakt gövdedeki tekerlek motorları zamanla aşınabilir." },
      { title: "Sensör kirliliği", description: "Düşme/çarpma sensörlerinin temizliği düzenli bakım gerektirir." },
      { title: "Şarj devresi arızası", description: "Şarj olmama şikayetleri devre kartı kontrolü gerektirebilir." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Lefant robot süpürgem için ücretsiz arıza tespiti yapıyor musunuz?", answer: "Evet, cihazınız elimize ulaştıktan sonra ücretsiz arıza tespiti yapıyoruz." }]),
  },
  {
    slug: "ilife",
    name: "ILIFE",
    intro:
      "ILIFE, pazarın en köklü bütçe dostu robot süpürge markalarından biridir. Samsun Robot Hastanesi'nde ILIFE modellerinde motor, sensör ve batarya onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Fırça motoru tıkanıklığı", description: "Saç/tüy birikimi ana fırça motorunu zorlayabilir." },
      { title: "Sensör arızası", description: "Düşme ve çarpma sensörlerinin arızalanması navigasyonu etkiler." },
      { title: "Şarj teması sorunu", description: "Dock pinlerindeki temas kaybı şarj olmama şikayeti yaratır." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "ILIFE robot süpürgem eski model, yine de bakıyor musunuz?", answer: "Çoğu model için orijinal eşdeğeri yedek parça temin edebiliyoruz." }]),
  },
  {
    slug: "miele",
    name: "Miele",
    intro:
      "Alman lüks ev aletleri markası Miele, Scout RX serisiyle premium segmentte robot süpürge sunar. Samsun Robot Hastanesi'nde Miele Scout RX modellerinde hassas elektronik onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Anakart/elektronik arıza", description: "Premium segmentteki hassas elektronik kartlarda mikro lehim seviyesinde onarım gerekebilir." },
      { title: "Navigasyon sensörü hatası", description: "Kamera veya LiDAR tabanlı sensördeki arıza haritalamayı etkiler." },
      { title: "Fırça motoru arızası", description: "Ana fırça motorunun aşınması emiş performansını düşürür." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Miele Scout RX modelim premium bir cihaz, hassas onarım yapabiliyor musunuz?", answer: "Evet, atölyemizde mikro lehim seviyesinde hassas elektronik onarım kapasitemiz var." }]),
  },
  {
    slug: "vorwerk",
    name: "Vorwerk",
    intro:
      "Alman marka Vorwerk, doğrudan satış modeliyle bilinen Kobold VR serisi robot süpürgeler üretir. Samsun Robot Hastanesi'nde Vorwerk Kobold modellerinde hassas elektronik ve motor onarımı yapıyoruz.",
    faultsJson: JSON.stringify([
      { title: "Kobold VR anakart arızası", description: "Premium segmentteki elektronik kartlarda mikro lehim seviyesinde onarım gerekebilir." },
      { title: "Navigasyon sensörü hatası", description: "Sensör kalibrasyonu bozulduğunda haritalama hataları oluşur." },
      { title: "Fırça motoru arızası", description: "Ana fırça motorunun aşınması emiş performansını düşürür." },
      { title: "Batarya değişimi", description: "Orijinal eşdeğeri batarya paketiyle değişim yapıyoruz." },
    ]),
    faqJson: JSON.stringify([{ question: "Vorwerk Kobold VR modelim için yetkili servis dışında bakım alabilir miyim?", answer: "Evet, bağımsız teknik servisimizde orijinal eşdeğeri parçalarla onarım hizmeti veriyoruz." }]),
  },
];
