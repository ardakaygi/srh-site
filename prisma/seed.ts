/**
 * Seed script.
 *
 * All 81 provinces are seeded (prisma/data/provinces.ts - authoritative
 * plaka kodu + region table, region-grounded content, see that file's
 * header for what "differentiated" means here). Brands cover 28 real,
 * verified manufacturers (prisma/data/brands.ts) - not yet the full "70+"
 * MASTER_PROMPT.md target; reaching that requires a brand catalog verified
 * against the business's actual supplier/import list (backlog.md), which
 * this seed does not fabricate. Models cover every brand except Grundig
 * (prisma/data/models.ts - no confidently-verifiable model name found for
 * it, see decisions.md) with at least one real, market-known model — see
 * known-issues.md: fault text and model specs here are commonly-published
 * approximations and should be verified against manufacturer spec sheets
 * before this becomes real production copy.
 */
import { PrismaClient } from "@prisma/client";
import { PROVINCES } from "./data/provinces";
import { EXTRA_BRANDS } from "./data/brands";
import { EXTRA_MODELS } from "./data/models";

const prisma = new PrismaClient();

async function main() {
  await prisma.serviceRequestStatusEvent.deleteMany();
  await prisma.serviceRequest.deleteMany();
  await prisma.model.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.province.deleteMany();

  const brands = await Promise.all([
    prisma.brand.create({
      data: {
        slug: "roborock",
        name: "Roborock",
        intro:
          "Roborock robot süpürgeler, güçlü LiDAR navigasyonu ve yüksek emiş gücüyle bilinir. Samsun Robot Hastanesi olarak Roborock'un tüm S, Q ve E serisi modellerinde batarya değişimi, LiDAR sensör onarımı, anakart tamiri ve yazılım/haritalama sorunlarına uzman teknik destek sağlıyoruz.",
        faultsJson: JSON.stringify([
          { title: "LiDAR sensör hatası", description: "Kule dönmüyor, harita bozuk çıkıyor veya 'LiDAR hatası' uyarısı alınıyor. Genellikle motor arızası ya da toz/saç birikiminden kaynaklanır." },
          { title: "Dock şarj teması sorunu", description: "Cihaz dock'a gidiyor ama şarj olmuyor; şarj pinlerinde oksitlenme veya temas kaybı yaygın nedendir." },
          { title: "Mop pompası arızası", description: "Paspaslama modunda su akmıyor veya sürekli akıyor; pompa motoru veya valf değişimi gerekebilir." },
          { title: "Haritalama sapması", description: "Robot odaları karıştırıyor, aynı yeri tekrar süpürüyor; jiroskop kalibrasyonu veya LiDAR hizalaması gerekir." },
          { title: "Batarya ömrü sonu", description: "Şarj süresi kısalıyor, cihaz görevi yarıda bırakıyor; orijinal hücrelerle spot kaynaklı batarya paketi yenileme çözümdür." },
          { title: "Anakart/güç kartı arızası", description: "Cihaz hiç açılmıyor veya rastgele kapanıyor; mikro lehim seviyesinde anakart onarımı gerekir." },
        ]),
        faqJson: JSON.stringify([
          { question: "Roborock robot süpürgemin garantisi bitti, yine de tamir edebilir misiniz?", answer: "Evet, garanti süresi dolmuş Roborock cihazlarında da orijinal yedek parça ile onarım yapıyoruz." },
          { question: "Roborock için ücretsiz arıza tespiti var mı?", answer: "Evet, cihazınız elimize ulaştıktan sonra ücretsiz arıza tespiti yapıp size teklif sunuyoruz; onay vermeden herhangi bir işlem yapılmaz." },
        ]),
      },
    }),
    prisma.brand.create({
      data: {
        slug: "xiaomi",
        name: "Xiaomi",
        intro:
          "Xiaomi Mi Robot Vacuum serisi, fiyat/performans dengesiyle Türkiye'de en yaygın kullanılan robot süpürgeler arasında. Samsun Robot Hastanesi, Xiaomi'nin lazer navigasyon sistemli tüm modellerinde teknik servis ve batarya yenileme hizmeti sunar.",
        faultsJson: JSON.stringify([
          { title: "Şarj olmuyor", description: "Adaptör, dock teması veya batarya kaynaklı şarj problemleri en sık karşılaşılan arızadır." },
          { title: "Fırça motoru dönmüyor", description: "Ana fırçaya dolanan saç/tüy motoru zorluyor, zamanla motor arızasına yol açabilir." },
          { title: "Wi-Fi bağlantı sorunu", description: "Mi Home uygulamasına bağlanamama, çoğunlukla yazılım güncellemesi veya Wi-Fi modülü ile ilgilidir." },
          { title: "Mop su haznesi sızdırması", description: "Su haznesi contası veya valfi hasar görmüş olabilir, cihazın altını ıslatır." },
        ]),
        faqJson: JSON.stringify([
          { question: "Xiaomi robot süpürgemi Samsun dışından nasıl gönderebilirim?", answer: "Servis talebi formunu doldurduktan sonra size özel bir takip kodu ve anlaşmalı kargo ile gönderim talimatı gönderiyoruz." },
        ]),
      },
    }),
    prisma.brand.create({
      data: {
        slug: "dreame",
        name: "Dreame",
        intro:
          "Dreame, otomatik toz boşaltma ve yüksek emiş gücüyle öne çıkan bir marka. Samsun Robot Hastanesi'nde Dreame'in X ve L serisi modellerinde istasyon, sensör ve batarya onarımı yapıyoruz.",
        faultsJson: JSON.stringify([
          { title: "Otomatik boşaltma istasyonu arızası", description: "İstasyon toz haznesini boşaltmıyor veya hata veriyor; hortum tıkanıklığı ya da motor arızası olabilir." },
          { title: "Engel algılama sensör hatası", description: "Cihaz eşyalara çarpıyor veya duruyor; ön sensörlerin temizliği veya değişimi gerekebilir." },
          { title: "Batarya şişmesi", description: "Uzun süreli yanlış şarj döngüleri bataryada şişmeye yol açabilir; güvenlik nedeniyle acil batarya değişimi önerilir." },
        ]),
        faqJson: JSON.stringify([
          { question: "Dreame otomatik boşaltma istasyonunu da tamir ediyor musunuz?", answer: "Evet, robot gövdesinin yanı sıra şarj/boşaltma istasyonlarına da teknik servis veriyoruz." },
        ]),
      },
    }),
    prisma.brand.create({
      data: {
        slug: "ecovacs",
        name: "Ecovacs",
        intro:
          "Ecovacs Deebot serisi, çok yönlü temizlik modlarıyla bilinir. Samsun Robot Hastanesi, Deebot modellerinde navigasyon, mop sistemi ve anakart onarımı konusunda uzmanlaşmıştır.",
        faultsJson: JSON.stringify([
          { title: "Navigasyon/harita kaybı", description: "Cihaz her temizlikte yeniden haritalıyor; kamera veya LDS sensör temizliği/kalibrasyonu gerekebilir." },
          { title: "Mop plakası titreşim motoru arızası", description: "OZMO türü titreşimli paspaslama sistemlerinde motor arızası paspaslama gücünü azaltır." },
          { title: "Toz haznesi sensörü", description: "'Toz haznesi dolu' uyarısı haznesi boş olsa da çıkıyorsa sensör temizliği/değişimi gerekir." },
        ]),
        faqJson: JSON.stringify([
          { question: "Ecovacs cihazımda hangi yedek parçalar orijinal?", answer: "Tüm onarımlarda orijinal veya orijinal eşdeğeri sertifikalı yedek parça kullanıyoruz." },
        ]),
      },
    }),
    prisma.brand.create({
      data: {
        slug: "irobot",
        name: "iRobot",
        intro:
          "iRobot Roomba, robot süpürge pazarının öncü markalarından. Samsun Robot Hastanesi'nde Roomba'nın fırça sistemi, batarya ve dock istasyonu arızalarına teknik çözüm sunuyoruz.",
        faultsJson: JSON.stringify([
          { title: "Lastik tekerlek arızası", description: "Tekerlek takılıyor veya dönmüyor; içine dolanan saç/iplik ya da tekerlek motoru arızası olabilir." },
          { title: "Kauçuk fırça aşınması", description: "İkiz kauçuk fırçaların aşınması emiş performansını düşürür, periyodik değişim gerektirir." },
          { title: "Dock (Home Base) bağlantı sorunu", description: "Cihaz dock'u bulamıyor veya şarj olmuyor; dock elektroniği veya IR sensör arızası olabilir." },
        ]),
        faqJson: JSON.stringify([
          { question: "Roomba'mın bataryası ne kadar sürede tükeniyor, değişim yapıyor musunuz?", answer: "Evet, orijinal hücrelerle spot kaynaklı batarya paketi üretip taktığımız bir batarya yenileme hizmetimiz var." },
        ]),
      },
    }),
    prisma.brand.create({
      data: {
        slug: "dyson",
        name: "Dyson",
        intro:
          "Dyson'ın robot süpürge teknolojisi, güçlü emiş ve hassas sensör sistemine dayanır. Samsun Robot Hastanesi, Dyson cihazlarında ileri seviye elektronik onarım ve batarya yenileme hizmeti verir.",
        faultsJson: JSON.stringify([
          { title: "Emiş gücü düşüşü", description: "Filtre tıkanıklığı, fan motoru yıpranması veya hava kanalı tıkanıklığından kaynaklanabilir." },
          { title: "360° kamera navigasyon hatası", description: "Kamera lensinin kirlenmesi veya donanım arızası haritalamayı bozar." },
          { title: "Batarya güvenlik uyarısı", description: "Resmi kurumların lityum batarya güvenlik uyarıları nedeniyle sertifikalı, güvenlik standartlarına uygun batarya değişimini öneriyoruz." },
        ]),
        faqJson: JSON.stringify([
          { question: "Dyson robot süpürgemin bataryasını güvenli şekilde değiştirebilir misiniz?", answer: "Evet, lehim değil nikel şerit spot kaynak yöntemiyle, ilgili güvenlik standartlarını gözeterek batarya paketi üretiyoruz." },
        ]),
      },
    }),
  ]);

  await prisma.brand.createMany({ data: EXTRA_BRANDS });

  const [roborock, xiaomi, dreame] = brands;

  await prisma.model.createMany({
    data: [
      {
        brandId: roborock.id,
        slug: "s7",
        name: "Roborock S7",
        suctionPa: 2500,
        batteryMah: 5200,
        runtimeMin: 180,
        commonIssues: JSON.stringify([
          { title: "Sonik mop titreşim motoru arızası", description: "S7'ye özgü sonik paspaslama motoru zamanla arızalanabilir, paspaslama gücü azalır." },
          { title: "Otomatik mop kaldırma mekanizması takılması", description: "Halıya geçişte paspas otomatik kalkmıyorsa mekanizma temizliği/onarımı gerekir." },
        ]),
        partsNote: "S7 için orijinal eşdeğeri sonik mop motoru, ana fırça seti ve 5200mAh spot kaynaklı batarya paketi stoklarımızda mevcuttur.",
      },
      {
        brandId: roborock.id,
        slug: "q10",
        name: "Roborock Q10",
        suctionPa: 5500,
        batteryMah: 5200,
        runtimeMin: 180,
        commonIssues: JSON.stringify([
          { title: "Yüksek emiş modunda ısınma", description: "Q10'un yüksek emiş performansı, fan motorunda erken yıpranmaya yol açabilir; motor bakımı önerilir." },
        ]),
        partsNote: "Q10 için fan motoru, yan fırça ve batarya paketi yedek parça olarak temin edilebilir.",
      },
      {
        brandId: xiaomi.id,
        slug: "mop-pro",
        name: "Xiaomi Mi Robot Vacuum-Mop Pro",
        suctionPa: 2200,
        batteryMah: 5200,
        runtimeMin: 120,
        commonIssues: JSON.stringify([
          { title: "Mop haznesi damlatma valfi arızası", description: "Elektronik su kontrol valfi arızalandığında paspas modunda su damlatması veya hiç akmaması görülür." },
        ]),
        partsNote: "Mop Pro için su valfi, ana fırça ve batarya paketi orijinal eşdeğeri olarak temin edilir.",
      },
      {
        brandId: xiaomi.id,
        slug: "s10",
        name: "Xiaomi Robot Vacuum S10",
        suctionPa: 4000,
        batteryMah: 5200,
        runtimeMin: 130,
        commonIssues: JSON.stringify([
          { title: "LDS lazer modülü arızası", description: "S10'un lazer mesafe sensörü modülü hasar görürse harita oluşturamaz." },
        ]),
        partsNote: "S10 için LDS modülü ve batarya paketi yedek parça stoklarımızda bulunur.",
      },
      {
        brandId: dreame.id,
        slug: "x40",
        name: "Dreame X40",
        suctionPa: 12000,
        batteryMah: 5200,
        runtimeMin: 220,
        commonIssues: JSON.stringify([
          { title: "Otomatik istasyon su haznesi hijyeni", description: "Sıcak su ile mop yıkama istasyonunda düzenli bakım yapılmazsa pompa arızası oluşabilir." },
        ]),
        partsNote: "X40 istasyon pompası, hortum seti ve robot bataryası ayrı ayrı temin edilebilir.",
      },
    ],
  });

  // EXTRA_MODELS references brands by slug (spans both the core brands
  // created above and EXTRA_BRANDS) - resolve to ids via one bulk lookup
  // rather than a query per model.
  const allBrands = await prisma.brand.findMany({ select: { id: true, slug: true } });
  const brandIdBySlug = new Map(allBrands.map((b) => [b.slug, b.id]));
  await prisma.model.createMany({
    data: EXTRA_MODELS.map((m) => {
      const brandId = brandIdBySlug.get(m.brandSlug);
      if (!brandId) {
        throw new Error(`EXTRA_MODELS: unknown brandSlug "${m.brandSlug}" for model "${m.name}"`);
      }
      return {
        brandId,
        slug: m.slug,
        name: m.name,
        commonIssues: m.commonIssues,
        partsNote: m.partsNote,
      };
    }),
  });

  await prisma.province.createMany({ data: PROVINCES });

  const totalBrands = await prisma.brand.count();
  const totalModels = await prisma.model.count();
  const totalProvinces = await prisma.province.count();
  console.log("Seed tamamlandı:", {
    brands: totalBrands,
    models: totalModels,
    provinces: totalProvinces,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
