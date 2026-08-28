/**
 * Seed data for the BlogPost table (2026-08-28: migrated from a static
 * src/lib/blogPosts.ts array to the database so posts are editable from
 * /admin/blog without a code deploy - see decisions.md). This file is
 * only read by prisma/seed.ts now; edit posts via the admin panel or
 * Prisma Studio afterwards, not here.
 *
 * Content: robot süpürge bakım/onarım konularında genel, doğrulanabilir
 * teknik bilgi (marka faaliyetleri sayfalarındaki aynı teknik gerçeklerle
 * tutarlı - LiDAR, batarya, anakart vb.). İşletmeye özgü iddialar (fiyat,
 * süre, rakam) içermez; sadece genel bakım/onarım bilgisi ve site içi
 * yönlendirme amaçlıdır.
 */

export interface BlogSectionSeed {
  heading: string;
  body: string;
}

export interface BlogPostSeed {
  slug: string;
  coverImage: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string; // ISO date
  readMinutes: number;
  sections: BlogSectionSeed[];
}

export const BLOG_POSTS: BlogPostSeed[] = [
  {
    slug: "robot-supurge-omrunu-uzatmanin-10-yolu",
    coverImage: "/blog-covers/brush.jpg",
    title: "Robot Süpürgenizin Ömrünü Uzatmanın 10 Yolu",
    excerpt: "Doğru bakım alışkanlıklarıyla robot süpürgenizin motor, sensör ve batarya ömrünü belirgin şekilde uzatabilirsiniz.",
    category: "Bakım",
    publishedAt: "2026-01-12",
    readMinutes: 5,
    sections: [
      { heading: "Düzenli fırça ve filtre temizliği", body: "Ana fırçaya ve yan fırçalara dolanan saç, tüy ve iplik parçaları motor üzerinde ekstra yük oluşturur. Haftada bir fırçaları, iki haftada bir filtreyi temizlemek motor ömrünü doğrudan etkiler." },
      { heading: "Sensörleri kuru bir bezle silin", body: "Düşme sensörleri, çarpışma sensörleri ve LiDAR kulesi üzerindeki toz birikimi hem navigasyon hatalarına hem de zamanla sensör arızasına yol açar. Haftalık kuru bez temizliği yeterlidir." },
      { heading: "Şarj istasyonunu sabit ve temiz tutun", body: "Dock'un önünde en az 0.5 metre boşluk bırakın ve şarj pinlerini nemli bir bezle ayda bir silin. Kirli/paslı pinler şarj olmama şikayetinin en sık nedenidir." },
      { heading: "Bataryayı tamamen boşaltmayın", body: "Lityum bataryalar sürekli %0'a inip tam şarj olma döngüsünden çok, orta seviyede kullanılmaktan daha uzun ömürlü çıkar. Cihazı uzun süre kullanmayacaksanız %40-50 şarjda saklayın." },
      { heading: "Yazılımı güncel tutun", body: "Üretici firmaların yayınladığı firmware güncellemeleri çoğu zaman navigasyon algoritmasını ve batarya yönetimini iyileştirir; uygulama üzerinden bildirim geldiğinde güncellemeyi geciktirmeyin." },
    ],
  },
  {
    slug: "robot-supurge-sarj-olmuyor-ne-yapmali",
    coverImage: "/blog-covers/charger.jpg",
    title: "Robot Süpürge Şarj Almıyorsa Yapılması Gerekenler",
    excerpt: "Şarj olmama şikayeti genelde basit bir temas sorunundan kaynaklanır; ama bazı durumlarda batarya veya devre kartı onarımı gerekir.",
    category: "Arıza Rehberi",
    publishedAt: "2026-01-19",
    readMinutes: 4,
    sections: [
      { heading: "Önce dock temasını kontrol edin", body: "Cihazın alt kısmındaki şarj pinleri ile dock üzerindeki pinlerin tam temas edip etmediğine bakın. Pinlerde oksitlenme varsa kuru bir bezle nazikçe temizleyin." },
      { heading: "Adaptörü ve prizi test edin", body: "Adaptörün başka bir prizde çalışıp çalışmadığını kontrol edin. Adaptör kablosunda kırılma veya ezilme varsa değişim gerekebilir." },
      { heading: "Cihazı sıfırlayın", body: "Çoğu robot süpürgede güç düğmesini 10 saniye basılı tutarak yapılan bir sıfırlama, yazılımsal kaynaklı şarj algılama hatalarını çözebilir." },
      { heading: "Sorun devam ediyorsa batarya veya devre kartı sorunudur", body: "Yukarıdaki adımlar sonuç vermezse sorun büyük ihtimalle batarya hücrelerinin ömrünü tamamlamış olması ya da şarj devresindeki bir elektronik arızadır; bu noktada profesyonel arıza tespiti gerekir." },
    ],
  },
  {
    slug: "lidar-sensoru-nedir-bakimi-nasil-yapilir",
    coverImage: "/blog-covers/navigation.jpg",
    title: "LiDAR Sensörü Nedir, Bakımı Nasıl Yapılır?",
    excerpt: "Robot süpürgelerin haritalama yeteneğinin kalbi olan LiDAR sensörü hakkında bilmeniz gerekenler.",
    category: "Teknik Bilgi",
    publishedAt: "2026-01-26",
    readMinutes: 4,
    sections: [
      { heading: "LiDAR nasıl çalışır?", body: "LiDAR (Light Detection and Ranging), cihazın üzerindeki dönen kuleden lazer ışını göndererek çevredeki nesnelere olan mesafeyi ölçer ve bu verilerle evin haritasını çıkarır." },
      { heading: "Yaygın LiDAR arızaları", body: "Kule dönmüyor, harita sürekli bozuk çıkıyor veya cihaz 'lazer sensör hatası' uyarısı veriyorsa; bunun nedeni genellikle kule motorundaki aşınma, lens üzerindeki toz/saç birikimi veya sensörün fiziksel darbe görmesidir." },
      { heading: "Ev bakımı ile yapabilecekleriniz", body: "Kule etrafındaki toz ve saçları yumuşak bir fırçayla temizleyebilir, lensi kuru bir mikrofiber bezle silebilirsiniz. Kule dönmüyorsa veya mekanik bir ses geliyorsa müdahale etmeyin, motor değişimi gerekebilir." },
      { heading: "Ne zaman profesyonel destek gerekir?", body: "Temizlik sonrası harita hâlâ bozuk çıkıyorsa kalibrasyon veya motor/kule değişimi gerekiyor demektir; bu işlem hassas bir elektronik-mekanik müdahale olduğundan uzman teknik servise başvurmanızı öneririz." },
    ],
  },
  {
    slug: "robot-supurge-bataryasi-ne-zaman-degismeli",
    coverImage: "/blog-covers/charger.jpg",
    title: "Robot Süpürge Bataryası Ne Zaman Değişmeli?",
    excerpt: "Çalışma süresindeki kısalma her zaman batarya sorunu değildir; ama bazı belirtiler kesin bir işarettir.",
    category: "Bakım",
    publishedAt: "2026-02-02",
    readMinutes: 4,
    sections: [
      { heading: "Belirti 1: Çalışma süresi ciddi şekilde kısalıyor", body: "İlk günkü çalışma süresinin yarısının altına düşülmesi, batarya hücrelerinin kapasitesini kaybettiğinin en net göstergesidir." },
      { heading: "Belirti 2: Cihaz görevi tamamlamadan dock'a dönüyor", body: "Batarya seviyesi göstergesi yüksek olsa bile cihaz beklenenden erken şarja gidiyorsa, hücrelerdeki gerilim dengesizliği söz konusu olabilir." },
      { heading: "Belirti 3: Batarya bölgesinde şişme veya ısınma", body: "Bu durum güvenlik açısından önemlidir; şişmiş bir lityum batarya paketi derhal kullanımdan kaldırılmalı ve profesyonel olarak değiştirilmelidir." },
      { heading: "Batarya değişiminde dikkat edilmesi gerekenler", body: "Batarya paketleri lehim yerine nikel şerit spot kaynak yöntemiyle üretilmelidir; lehim ısısı hücreleri zayıflatabilir ve güvenlik riski oluşturabilir." },
    ],
  },
  {
    slug: "mop-paspas-modu-calismiyor-kontrol-listesi",
    coverImage: "/blog-covers/mop.jpg",
    title: "Paspaslama (Mop) Modu Çalışmıyorsa Kontrol Listesi",
    excerpt: "Su akmıyor, sürekli damlıyor veya paspas hiç ıslanmıyor mu? İşte adım adım kontrol listesi.",
    category: "Arıza Rehberi",
    publishedAt: "2026-02-09",
    readMinutes: 4,
    sections: [
      { heading: "Su haznesini kontrol edin", body: "Haznenin doğru takıldığından ve içindeki filtrenin tıkalı olmadığından emin olun. Sert su kullanımı zamanla mineral birikintisi bırakabilir." },
      { heading: "Mop pedini/bezini kontrol edin", body: "Kurumuş veya sertleşmiş bir mop bezi suyu düzgün emmez. Bezi düzenli yıkayın ve aşırı yıpranmışsa değiştirin." },
      { heading: "Pompa veya valf arızası olabilir", body: "Su hiç akmıyor veya kontrolsüz akıyorsa, elektronik su valfi ya da pompa motoru arızalı olabilir; bu parçalar kullanıcı tarafından kolayca değiştirilemez." },
      { heading: "Otomatik istasyonlu modellerde ekstra kontrol", body: "Kendi kendini yıkayan istasyonlarda hortum tıkanıklığı ve pompa arızası ayrıca kontrol edilmelidir; istasyonun düzenli olarak temizlenmesi bu tür arızaları büyük ölçüde önler." },
    ],
  },
  {
    slug: "robot-supurgeyi-kislik-saklama-rehberi",
    coverImage: "/blog-covers/charger.jpg",
    title: "Robot Süpürgenizi Uzun Süre Kullanmayacaksanız Nasıl Saklamalısınız?",
    excerpt: "Yazlık eve taşınma, uzun tatil veya cihaz değişimi öncesi doğru saklama batarya sağlığını korur.",
    category: "Bakım",
    publishedAt: "2026-02-16",
    readMinutes: 3,
    sections: [
      { heading: "Bataryayı %100 ya da %0 bırakmayın", body: "Uzun süreli saklama için ideal şarj seviyesi %40-60 aralığıdır. Tam dolu veya tam boş bırakılan lityum bataryalar zamanla kapasite kaybeder." },
      { heading: "Toz haznesini ve su tankını boşaltın", body: "İçinde toz veya su bırakılan hazneler kötü koku ve küflenmeye yol açabilir; saklama öncesi tamamen boşaltıp kurulayın." },
      { heading: "Serin ve kuru bir ortamda saklayın", body: "Doğrudan güneş ışığı almayan, aşırı nem içermeyen bir ortam tercih edin; aşırı sıcaklık batarya ömrünü kısaltır." },
      { heading: "Tekrar kullanmadan önce kontrol edin", body: "Uzun süre sonra tekrar kullanmaya başlarken önce tam şarj edin, ardından kısa bir test çalıştırması yaparak fırça ve sensörlerin sorunsuz çalıştığını doğrulayın." },
    ],
  },
  {
    slug: "evcil-hayvan-tuyu-robot-supurgeyi-nasil-etkiler",
    coverImage: "/blog-covers/stuck.jpg",
    title: "Evcil Hayvan Tüyleri Robot Süpürgenizi Nasıl Etkiler?",
    excerpt: "Evcil hayvan sahipleri için robot süpürge bakımında dikkat edilmesi gereken ekstra noktalar.",
    category: "Bakım",
    publishedAt: "2026-02-23",
    readMinutes: 4,
    sections: [
      { heading: "Fırçalara dolanma riski daha yüksek", body: "Uzun evcil hayvan tüyleri ana fırçaya ve tekerlek akslarına kolayca dolanır, motor üzerinde ekstra yük oluşturarak zamanla motor arızasına yol açabilir." },
      { heading: "Filtre daha sık tıkanır", body: "Tüy yoğunluğu yüksek evlerde filtrenin normalden daha sık (haftalık) temizlenmesi, emiş gücünün korunması için önemlidir." },
      { heading: "Tekerlek ve fırça akslarını kontrol edin", body: "Tüy birikimi sadece ana fırçada değil, yan fırça ve tekerlek akslarında da görülebilir; bu bölgelerin periyodik olarak elle temizlenmesi arıza riskini azaltır." },
      { heading: "Ne zaman servise götürmelisiniz?", body: "Fırça dönmüyor, motor ses çıkarıyor veya emiş gücü belirgin şekilde düştüyse, dolanan tüyler motor bobinine zarar vermiş olabilir; bu noktada profesyonel kontrol gerekir." },
    ],
  },
  {
    slug: "roborock-xiaomi-dreame-hangi-marka-hangi-ihtiyaca-uygun",
    coverImage: "/blog-covers/brush.jpg",
    title: "Roborock, Xiaomi, Dreame: Hangi Marka Hangi İhtiyaca Uygun?",
    excerpt: "Türkiye'de en çok tercih edilen üç markanın güçlü yönlerine genel bir bakış.",
    category: "Marka Rehberi",
    publishedAt: "2026-03-02",
    readMinutes: 5,
    sections: [
      { heading: "Roborock: Güçlü navigasyon ve emiş", body: "Roborock'un LiDAR tabanlı navigasyon sistemi hassas haritalama sunar; çok odalı, karmaşık planlı evler için güçlü bir tercihtir." },
      { heading: "Xiaomi: Fiyat/performans dengesi", body: "Xiaomi'nin Mi Robot Vacuum serisi, uygun fiyatına rağmen lazer navigasyon ve temel paspaslama özellikleri sunarak geniş bir kullanıcı kitlesine hitap eder." },
      { heading: "Dreame: Otomatik istasyon teknolojisi", body: "Dreame'in X ve L serisi modelleri, kendi kendini boşaltan ve yıkayan istasyon teknolojisiyle öne çıkar; günlük bakım yükünü azaltmak isteyenler için uygundur." },
      { heading: "Hangi markayı seçerseniz seçin bakım gerekir", body: "Marka fark etmeksizin düzenli fırça/filtre temizliği ve periyodik sensör bakımı, cihazın performansını korumanın ortak kuralıdır." },
    ],
  },
  {
    slug: "robot-supurge-haritalama-hatasi-neden-olur",
    coverImage: "/blog-covers/navigation.jpg",
    title: "Robot Süpürge Haritalama Hatası Neden Olur?",
    excerpt: "Cihaz odaları karıştırıyor veya aynı yeri tekrar tekrar süpürüyorsa olası nedenler bunlar.",
    category: "Arıza Rehberi",
    publishedAt: "2026-03-09",
    readMinutes: 4,
    sections: [
      { heading: "Sensör kirliliği en yaygın nedendir", body: "LiDAR lensi veya kamera üzerindeki toz/leke, mesafe ölçümlerini bozarak haritanın hatalı çıkmasına neden olur." },
      { heading: "Ortam değişiklikleri haritayı şaşırtabilir", body: "Mobilya yerinin değişmesi, yeni bir eşya eklenmesi veya ışık koşullarının (kamera tabanlı modellerde) değişmesi geçici haritalama sapmalarına yol açabilir." },
      { heading: "Jiroskop kalibrasyonu bozulmuş olabilir", body: "Cihaz düşürülmüş veya sert bir darbe almışsa dahili jiroskop sensörünün kalibrasyonu bozulabilir, bu da yön algılama hatalarına neden olur." },
      { heading: "Kalıcı çözüm için ne yapılmalı?", body: "Sensör temizliği ve harita sıfırlama sorunu çözmüyorsa, donanımsal bir sensör arızası veya kalibrasyon ihtiyacı söz konusu olabilir; bu durumda teknik destek almanızı öneririz." },
    ],
  },
  {
    slug: "orijinal-mi-orijinal-esdegeri-mi-yedek-parca-rehberi",
    coverImage: "/blog-covers/brush.jpg",
    title: "Orijinal mı, Orijinal Eşdeğeri mi? Yedek Parça Rehberi",
    excerpt: "Robot süpürge onarımında kullanılan yedek parça türleri ve aralarındaki fark.",
    category: "Bilgilendirme",
    publishedAt: "2026-03-16",
    readMinutes: 4,
    sections: [
      { heading: "Orijinal parça nedir?", body: "Üretici firma tarafından üretilmiş veya onaylanmış, cihazla birebir aynı spesifikasyona sahip parçalardır." },
      { heading: "Orijinal eşdeğeri parça nedir?", body: "Üretici markalı olmasa da aynı teknik özelliklere (voltaj, kapasite, ölçü) sahip, sertifikalı üçüncü taraf üreticilerden temin edilen parçalardır. Özellikle eski veya artık üretilmeyen modellerde tek uygulanabilir seçenek olabilir." },
      { heading: "Batarya paketlerinde dikkat edilmesi gerekenler", body: "Batarya söz konusu olduğunda hücre kalitesi ve üretim yöntemi (spot kaynak vs. lehim) kritik önem taşır; ucuz, sertifikasız hücreler güvenlik riski oluşturabilir." },
      { heading: "Servis seçerken sorulması gereken soru", body: "Hangi tür parça kullanıldığını ve bu parçanın garanti kapsamında olup olmadığını servis sağlayıcınıza mutlaka sorun." },
    ],
  },
  {
    slug: "garanti-suresi-dolan-robot-supurgede-ne-yapmali",
    coverImage: "/blog-covers/charger.jpg",
    title: "Robot Süpürgenizde Garanti Süresi Dolduysa Ne Yapmalısınız?",
    excerpt: "Garanti bitince cihazın çöpe gitmesi gerekmez; bağımsız teknik servis seçenekleri mevcuttur.",
    category: "Bilgilendirme",
    publishedAt: "2026-03-23",
    readMinutes: 3,
    sections: [
      { heading: "Garanti dışı onarım mümkün mü?", body: "Evet, çoğu arıza (batarya, sensör, motor, anakart) garanti süresi bitmiş olsa da bağımsız teknik servisler tarafından onarılabilir." },
      { heading: "Yetkili servis her zaman en ekonomik seçenek olmayabilir", body: "Bazı markalarda yetkili servis maliyeti, cihazın güncel piyasa değerine yakın olabilir; bağımsız servisler orijinal eşdeğeri parçalarla daha ekonomik çözümler sunabilir." },
      { heading: "Arıza tespiti öncesi karar vermeyin", body: "Cihazınızı 'zaten tamir olmaz' diye düşünüp elden çıkarmadan önce, ücretsiz arıza tespiti sunan bir servisten net bir teşhis ve fiyat teklifi almanızı öneririz." },
    ],
  },
  {
    slug: "samsunda-robot-supurge-servisi-adim-adim",
    coverImage: "/blog-covers/mop.jpg",
    title: "Samsun'da Robot Süpürge Servisi Nasıl Çalışır? Adım Adım",
    excerpt: "Servis talebinden cihazın elinize geri ulaşmasına kadar tüm süreç.",
    category: "Bilgilendirme",
    publishedAt: "2026-03-30",
    readMinutes: 4,
    sections: [
      { heading: "1. Servis talebi oluşturma", body: "WhatsApp veya web sitesi üzerinden marka, model ve arıza bilgilerinizi paylaşarak talebinizi oluşturursunuz." },
      { heading: "2. Kargo ile gönderim", body: "Onayınızın ardından size özel bir kargo koduyla cihazınızı merkezimize gönderirsiniz; bu, Samsun dışındaki illerden de hizmet almanızı mümkün kılar." },
      { heading: "3. Ücretsiz arıza tespiti ve onay", body: "Cihaz merkezimize ulaştığında detaylı arıza tespiti yapılır, sonuç ve fiyat teklifi size bildirilir; onay vermeden onarıma başlanmaz." },
      { heading: "4. Onarım, test ve teslimat", body: "Onay sonrası onarım tamamlanır, cihaz fonksiyon testlerinden geçirilir ve garanti belgesiyle birlikte adresinize gönderilir." },
    ],
  },
  {
    slug: "anakart-arizasi-belirtileri-ve-onarim-sureci",
    coverImage: "/blog-covers/stuck.jpg",
    title: "Anakart Arızası Belirtileri ve Onarım Süreci",
    excerpt: "Cihaz hiç açılmıyor veya rastgele kapanıyorsa anakart kaynaklı bir sorun olabilir.",
    category: "Teknik Bilgi",
    publishedAt: "2026-04-06",
    readMinutes: 4,
    sections: [
      { heading: "Anakart arızasının belirtileri", body: "Cihazın hiç açılmaması, rastgele yeniden başlaması, bazı fonksiyonların (örneğin Wi-Fi veya belirli sensörler) tamamen çalışmaması anakart kaynaklı olabilir." },
      { heading: "En sık nedenler", body: "Nem teması, statik elektrik, yaşlanan lehim bağlantıları veya bir güç dalgalanması anakart üzerindeki bileşenlere zarar verebilir." },
      { heading: "Mikro lehim seviyesinde onarım nedir?", body: "Anakart onarımı, kartı komple değiştirmek yerine arızalı bileşeni (kondansatör, IC, direnç vb.) hassas ekipmanlarla tespit edip değiştirmeyi içerir; bu, komple kart değişimine göre daha ekonomik bir çözümdür." },
      { heading: "Ne zaman komple değişim gerekir?", body: "Kart üzerinde yaygın yanık izi veya çoklu bileşen hasarı varsa, komple anakart değişimi daha güvenli ve kalıcı bir çözüm olabilir." },
    ],
  },
  {
    slug: "wifi-baglanti-sorunlari-ve-cozumleri",
    coverImage: "/blog-covers/navigation.jpg",
    title: "Robot Süpürge Wi-Fi Bağlantı Sorunları ve Çözümleri",
    excerpt: "Uygulamaya bağlanamayan cihazlar için deneyebileceğiniz adımlar.",
    category: "Arıza Rehberi",
    publishedAt: "2026-04-13",
    readMinutes: 3,
    sections: [
      { heading: "Önce router'ı kontrol edin", body: "Çoğu robot süpürge yalnızca 2.4 GHz Wi-Fi ağlarını destekler; router'ınızın 5 GHz bandına bağlıyken eşleştirme başarısız olabilir." },
      { heading: "Uygulamayı ve firmware'i güncelleyin", body: "Hem telefon uygulamasının hem cihaz yazılımının güncel olması, bağlantı protokolündeki uyumsuzlukları önler." },
      { heading: "Cihazı ağdan silip yeniden ekleyin", body: "Uygulama üzerinden cihazı tamamen kaldırıp fabrika ayarlarına sıfırladıktan sonra yeniden eklemek, çoğu bağlantı sorununu çözer." },
      { heading: "Sorun devam ediyorsa", body: "Yukarıdaki adımlar işe yaramazsa, cihazın Wi-Fi modülünde donanımsal bir arıza olabilir; bu durumda modülün test edilmesi gerekir." },
    ],
  },
  {
    slug: "otomatik-toz-bosaltma-istasyonu-bakimi",
    coverImage: "/blog-covers/stuck.jpg",
    title: "Otomatik Toz Boşaltma İstasyonu Bakımı",
    excerpt: "İstasyonlu modellerde düzenli bakım, hem robotun hem istasyonun ömrünü uzatır.",
    category: "Bakım",
    publishedAt: "2026-04-20",
    readMinutes: 4,
    sections: [
      { heading: "Toz torbasını zamanında değiştirin", body: "Dolu bir toz torbası istasyonun boşaltma motorunu zorlar ve zamanla motor arızasına yol açabilir." },
      { heading: "Hortum ve bağlantı noktalarını kontrol edin", body: "İstasyon ile robot arasındaki boşaltma hortumunda tıkanıklık, 'boşaltma başarısız' hatalarının en sık nedenidir." },
      { heading: "İstasyonun içini periyodik olarak temizleyin", body: "Ayda bir istasyonun iç kısmını kuru bir bezle temizlemek, toz birikintisi kaynaklı sensör hatalarını önler." },
      { heading: "Hata kodları göz ardı edilmemeli", body: "İstasyon üzerindeki hata ışıkları veya uygulamadaki uyarılar erken teşhis için önemlidir; tekrarlayan hatalarda profesyonel kontrol önerilir." },
    ],
  },
  {
    slug: "robot-supurge-alirken-dikkat-edilmesi-gereken-7-kriter",
    coverImage: "/blog-covers/charger.jpg",
    title: "Robot Süpürge Alırken Dikkat Edilmesi Gereken 7 Kriter",
    excerpt: "Yeni bir robot süpürge alırken sadece emiş gücüne bakmak yeterli değildir.",
    category: "Marka Rehberi",
    publishedAt: "2026-04-27",
    readMinutes: 5,
    sections: [
      { heading: "1. Navigasyon teknolojisi", body: "LiDAR tabanlı sistemler genellikle jiroskop/kamera tabanlı sistemlere göre daha hassas haritalama sunar." },
      { heading: "2. Emiş gücü ve batarya kapasitesi", body: "Yüksek Pa değeri güçlü emiş anlamına gelir, ancak yüksek batarya kapasitesi (mAh) olmadan çalışma süresi kısa kalabilir." },
      { heading: "3. Paspaslama sistemi", body: "Basit sürtme mopları ile titreşimli/döner mop sistemleri arasındaki temizlik farkı, özellikle sert lekelerde belirgindir." },
      { heading: "4. Otomatik istasyon ihtiyacı", body: "Günlük bakımla uğraşmak istemiyorsanız kendi kendini boşaltan/yıkayan istasyonlu modeller zaman kazandırır, ancak istasyon bakımı ek bir sorumluluktur." },
      { heading: "5. Yedek parça ve servis desteği", body: "Türkiye'de yaygın satılan ve servis desteği bulunan markaları tercih etmek, ileride yaşanacak arızalarda süreci kolaylaştırır." },
      { heading: "6. Ev planınıza uygunluk", body: "Çok odalı, eşyalı bir ev için gelişmiş navigasyon; açık plan, sade bir ev için orta segment bir model yeterli olabilir." },
      { heading: "7. Uygulama ve akıllı ev entegrasyonu", body: "Sesli asistan veya akıllı ev sistemleriyle uyumluluk, günlük kullanım kolaylığı açısından tercih sebebi olabilir." },
    ],
  },
  {
    slug: "firca-ve-filtre-temizligi-ne-siklikla-yapilmali",
    coverImage: "/blog-covers/brush.jpg",
    title: "Fırça ve Filtre Temizliği: Ne Sıklıkla Yapılmalı?",
    excerpt: "Basit ama gözden kaçan bu bakım adımı, en sık karşılaşılan arızaların çoğunu önler.",
    category: "Bakım",
    publishedAt: "2026-05-04",
    readMinutes: 3,
    sections: [
      { heading: "Ana fırça: haftada bir", body: "Ana fırçaya dolanan saç ve iplikler makasla kesilip elle temizlenmelidir; fırça üzerindeki aşınma belirginse değişim zamanı gelmiş demektir." },
      { heading: "Yan fırçalar: haftada bir", body: "Yan fırçalar köşe ve kenar temizliğinde kritik rol oynar; kırılan veya eğrilen fırça telleri temizlik verimini düşürür." },
      { heading: "Filtre: iki haftada bir", body: "Filtrenin tozunu silkelemek yeterli olmayabilir; su ile yıkanabilir filtrelerde üretici talimatına uyarak tam kurutma sonrası tekrar takın." },
      { heading: "Sensörler: haftada bir kuru bez ile", body: "Düşme ve çarpışma sensörlerinin üzerindeki toz tabakası, cihazın merdivenden düşmesi gibi ciddi kazalara yol açabilir; bu adımı atlamayın." },
    ],
  },
  {
    slug: "robot-supurge-neden-ayni-yeri-tekrar-supuruyor",
    coverImage: "/blog-covers/navigation.jpg",
    title: "Robot Süpürgeniz Neden Aynı Yeri Tekrar Tekrar Süpürüyor?",
    excerpt: "Verimsiz temizlik rotalarının arkasındaki teknik nedenler.",
    category: "Arıza Rehberi",
    publishedAt: "2026-05-11",
    readMinutes: 3,
    sections: [
      { heading: "Harita bozuk veya güncel değil", body: "Ev düzeninde değişiklik yapıldıysa ancak harita güncellenmediyse, cihaz eski haritaya göre hareket ederek verimsiz rotalar izleyebilir." },
      { heading: "Tekerlek sensörü hatalı okuma yapıyor olabilir", body: "Tekerleğin ne kadar döndüğünü ölçen enkoder sensörü arızalıysa, cihaz kat ettiği mesafeyi yanlış hesaplayabilir." },
      { heading: "Zemin geçişleri kafa karıştırabilir", body: "Halıdan parkeye ani geçişler, tekerlek kayması nedeniyle konum tahminini geçici olarak bozabilir." },
      { heading: "Çözüm önerileri", body: "Haritayı silip yeniden oluşturmayı deneyin; sorun devam ederse tekerlek enkoder sensörünün kontrol edilmesi gerekebilir." },
    ],
  },
  {
    slug: "kargo-ile-robot-supurge-gonderirken-paketleme-rehberi",
    coverImage: "/blog-covers/mop.jpg",
    title: "Kargo ile Robot Süpürge Gönderirken Paketleme Rehberi",
    excerpt: "Cihazınızın taşıma sırasında hasar görmemesi için basit ama etkili öneriler.",
    category: "Bilgilendirme",
    publishedAt: "2026-05-18",
    readMinutes: 3,
    sections: [
      { heading: "Orijinal kutu varsa kullanın", body: "Orijinal kutu ve iç köpük ambalaj, cihaza en uygun koruma seviyesini sağlar. Yoksa dayanıklı bir karton kutu ve bol köpük/kabarcıklı naylon kullanın." },
      { heading: "Su haznesini ve toz haznesini boşaltın", body: "Taşıma sırasında sızıntı ve toz saçılmasını önlemek için haznelerin boş olduğundan emin olun." },
      { heading: "Hareketli parçaları sabitleyin", body: "Yan fırça gibi çıkarılabilen parçaları ayrı, küçük bir poşette gönderin; cihazın üzerinde gevşek kalmalarını önleyin." },
      { heading: "Arıza notu ekleyin", body: "Kısa bir not ile gözlemlediğiniz arızayı yazılı olarak eklemeniz, arıza tespiti sürecini hızlandırır." },
    ],
  },
  {
    slug: "bakimi-kendiniz-mi-yapmalisiniz-servise-mi-goturmelisiniz",
    coverImage: "/blog-covers/brush.jpg",
    title: "Robot Süpürge Bakımını Kendiniz mi Yapmalısınız, Servise mi Götürmelisiniz?",
    excerpt: "Hangi işlemler ev bakımıyla çözülür, hangileri profesyonel müdahale gerektirir?",
    category: "Bilgilendirme",
    publishedAt: "2026-05-25",
    readMinutes: 4,
    sections: [
      { heading: "Kendi başınıza yapabilecekleriniz", body: "Fırça/filtre temizliği, sensör silme, su/toz haznesi boşaltma, yazılım güncellemesi ve fabrika ayarlarına sıfırlama gibi işlemler kullanıcı el kitabında anlatılan güvenli, geri alınabilir adımlardır." },
      { heading: "Servise bırakmanız gereken işlemler", body: "Batarya değişimi, anakart onarımı, motor değişimi, LiDAR kule/motor değişimi gibi işlemler özel ekipman ve teknik bilgi gerektirir; yanlış müdahale cihaza kalıcı zarar verebilir ya da güvenlik riski oluşturabilir." },
      { heading: "Garantiye dikkat edin", body: "Cihazınız hâlâ garanti kapsamındaysa, yetkisiz açma/müdahale garantinizi geçersiz kılabilir; önce garanti şartlarını kontrol edin." },
      { heading: "Karar vermekte zorlanıyorsanız", body: "Emin olmadığınız durumlarda cihazı açmadan önce ücretsiz arıza tespiti sunan bir teknik servisten görüş almanız, hem cihazınızı hem garantinizi korumanın en güvenli yoludur." },
    ],
  },
];
