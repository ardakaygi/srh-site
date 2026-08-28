# Bilinen Sorunlar ve Riskler

## Çözülmüş (2026-08-27, `/code-review` + `/security-review` bulguları)

- ~~Telefon numarasıyla servis talebi sorgulama, ikinci faktör olmadan PII sızdırıyordu~~ — düzeltildi: ad soyad + telefon birlikte eşleşmesi zorunlu kılındı (`src/app/servis-takip/page.tsx`).
- ~~Telefon formatı farkları (boşluk/tire) nedeniyle sorgulama başarısız oluyordu~~ — düzeltildi: telefon artık hem kayıt hem sorgu tarafında `normalizePhone()` ile sadece rakamlara indirgeniyor.
- ~~Kargo entegrasyonu hatası servis talebini tamamen başarısız gösterebilirdi~~ — düzeltildi: `try/catch` ile sarıldı, talep zaten kaydedildiği için müşteri her durumda takip kodunu alıyor.
- ~~`/servis-talep` sayfası marka başına ayrı sorgu atıyordu (N+1)~~ — düzeltildi: tek toplu sorgu + bellekte gruplama.
- ~~Anasayfa sonek'i sabit kodluyordu~~ — düzeltildi: paylaşılan `ilMarkaSlug()` helper'ı kullanılıyor.

**Yanlış pozitif olarak elenen bulgu:** `/code-review`'in "`package.json`'daki `allowScripts` alanı geçersiz/etkisiz" iddiası — bu oturumda bizzat çalıştırılıp doğrulandı (npm 11.19.0'ın gerçek `install-scripts` özelliği; onay öncesi postinstall script'leri gerçekten engelliyor, onay sonrası çalışıyor). Aksiyon alınmadı.

## Admin panel (2026-08-28) — bilinçli kapsam dışı bırakılanlar

- **Tek admin şifresi, kullanıcı adı yok.** Birden fazla personelin ayrı hesapla giriş yapması gerekirse gerçek bir auth kütüphanesine (ör. Auth.js) geçilmeli — kullanıcı "basit şifre" seçeneğini onayladı.
- **Giriş formunda rate limiting/brute-force koruması yok.** Şifre karşılaştırması `timingSafeEqual` ile zamanlama saldırısına karşı korunuyor, ama art arda deneme sayısını sınırlayan bir mekanizma yok. Gerçek yayın öncesi eklenmeli.
- **"Gerçek bir CMS gibi her metin/görsel" hedefi kısmi karşılandı.** Servis talepleri, markalar, iller, modeller, blog ve SSS artık tamamen admin panelden yönetiliyor (Prisma tablolarına taşındı). Ana sayfadaki hero/CTA metinlerinin bir kısmı da `SiteSetting` tablosu üzerinden düzenlenebilir. Ancak site genelindeki her metin (header/footer düzeni, sabit sayfa kopyası — Kurumsal, Tamir Merkezi, Yasal Uyarı vb. — ve `site-config.ts`'teki temel işletme bilgileri: telefon/adres/e-posta) hâlâ koda gömülü; bunları da admin'den düzenlenebilir yapmak, `siteConfig`'in senkron olarak import edildiği birçok client component'i (MobileNav, ServiceRequestForm, BrandsMegaMenu vb.) yeniden düzenlemeyi gerektiren ayrı, daha büyük bir iş.
- **Blog kapak görseli seçimi 5 sabit dosyayla sınırlı** (`public/blog-covers/`); admin panelden yeni görsel yüklenemiyor, sadece mevcut 5 fotoğraftan seçilebiliyor.

## Kapsamlı, henüz çözülmemiş

- **CSP `script-src`/`style-src` içinde `'unsafe-inline'` var.** Nonce tabanlı CSP, statik/ISR üretimini kıracağı için bilinçli olarak tercih edilmedi (bkz. `decisions.md`). Bu, XSS'e karşı savunmayı zayıflatan gerçek bir artık risktir. Gelecekte Next.js'in deneysel Subresource Integrity (SRI) desteği (`experimental.sri`) statik üretimi koruyarak daha güçlü bir CSP sağlayabilir — araştırıldı ama bu milestone'da uygulanmadı.
- **Kargo entegrasyonu stub.** `StubCarrierProvider` gerçek bir kargo firmasına bağlı değil; `carrierTrackingUrl` sadece kendi takip sayfamıza yönleniyor. Gerçek entegrasyon, işletme hangi kargo firmasını kullandığını teyit edince yapılmalı.
- **Servis talebi formu için rate limiting yok.** `submitServiceRequest` server action'ı herhangi bir hız sınırlama veya bot koruması içermiyor. Küçük ölçekte risk düşük ama gerçek trafik öncesi eklenmeli (ör. IP bazlı hız sınırlama).
- **KVKK aydınlatma metni ve çerez politikası taslak.** Gerçek veri sorumlusu unvanı, kargo firması adı ve tam metin bir hukuk danışmanı tarafından onaylanmadan yayına alınmamalı (sayfa içinde açık uyarı var).
- **GA4/GTM/Search Console henüz kurulmadı.** Master prompt'ta öngörülen analytics katmanı bu milestone'a dahil edilmedi.

## İçerik kapsamı (2026-08-27 genişletmesi sonrası)

- **İl sayfalarındaki farklılaştırma bölge seviyesinde, şehir seviyesinde değil.** 81 ilin her biri gerçek bir bölgeye (7 coğrafi bölge) atanmış ve her bölgenin gerçek iklim/kullanım özelliğine dayanan (Karadeniz nem, İç Anadolu toz, Akdeniz sıcaklık, Ege kıyı nemi, Marmara yoğun kullanım, Doğu Anadolu soğuk/batarya, Güneydoğu Anadolu aşırı sıcak) bir `regionalIntro` + FAQ seti var — ama aynı bölgedeki iller (ör. Mardin ve Şanlıurfa, ikisi de Güneydoğu Anadolu) birbirine çok benzer metin görüyor, sadece il adı ve hesaplanan teslimat süresi değişiyor. Bu, rakip sitenin tamamen şablon kopyalamasından daha iyi ama tam anlamıyla "her şehir için özgün" değil. Google'ın gerçek cezası olmasa da (bkz. `reports/2026-08-27-domain-research.md`), arama performansı izlenmeli; gerekirse en yüksek trafikli 15-20 il için bire bir özgün metin yazılabilir.
- **29 marka gerçek ve doğrulanmış, ama master prompt'un "70+" hedefinin altında.** Yeni marka eklerken gerçek bir kaynağa (işletmenin tedarikçi listesi, resmi distribütör kataloğu) dayanmadan isim uydurmayın — bu, bir teknik servis sitesinin güvenilirliğini doğrudan etkiler.
- **29 markanın sadece 3'ünde (Roborock, Xiaomi, Dreame) model mikro-sayfası var (toplam 5 model).** Diğer 26 marka için model sayfası yok; marka sayfaları bu durumda boş bir "Modeller" bölümü göstermiyor (koşullu render), ama bu markaların SEO değeri model derinliği olmadan sınırlı kalır.

## Mimari kırılganlıklar (düşük risk, izlenmeli)

- **`modelFullSlug` birleştirmesi teorik çakışma riski taşıyor.** `brandSlug + "-" + modelSlug` birleşimi, iki farklı (marka, model) çiftinin aynı birleşik string'i üretmesi durumunda URL çakışmasına yol açabilir (ör. varsayımsal "xiaomi-mop" markası + "pro" modeli, "xiaomi" markası + "mop-pro" modeliyle aynı URL'i üretir). Şu anki veri setinde gerçek bir çakışma yok ve marka slug'ları biz tarafından kontrol ediliyor, ama yeni marka/model eklerken bu kurala dikkat edilmeli. Bkz. `src/lib/slugs.test.ts` içindeki belgeleyici test.
- **İl sayfalarındaki "en çok talep edilen markalar" listesi gerçek sipariş verisine değil, editöryel tahmine dayanıyor.** Gerçek veri biriktikçe (servis talebi kayıtlarından) bu liste veri odaklı hale getirilmeli.

## Test kapsamı

- Sadece `src/lib/slugs.ts` ve `src/lib/tracking.ts` için gerçek otomatik birim testleri var (Vitest, 11 test, hepsi geçiyor). Bunlar **implementasyondan sonra** yazıldı (mevcut kodun regresyon testleri olarak), test-first değil — `test-driven-development` skill'inin disiplini bundan sonraki yeni özellikler için uygulanmalı.
- Uçtan uca akış (anasayfa → il/marka/model → servis talebi formu → takip) Playwright ile **manuel olarak** bir kez doğrulandı (bu oturumda), ama kalıcı bir e2e test paketine eklenmedi. Bir sonraki oturumda `tests/e2e/` altına taşınıp CI'a bağlanması önerilir.
- Prisma server action'ları (`submitServiceRequest`) için entegrasyon testi yok.
