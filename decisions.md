# Kararlar

Format: **[Tarih] Karar** — Gerekçe

- **[2026-08-27] Görüşme dili: Türkçe, master prompt: İngilizce, site içeriği: %100 Türkçe** — Kullanıcının açık talebi (`yeni.md` + sohbet talimatı). Kod/yorum/commit İngilizce kalabilir.

- **[2026-08-27] Global skill kurulumu (`context-loop-brain` ve alt skiller)** — `BRAIN.md`'nin talep ettiği araştırma→spec→görev→TDD→doğrulama döngüsünü kalıcı hale getirmek için `~/.claude/skills/` altına kuruldu (bu projeden bağımsız, tüm oturumlarda geçerli). Detaylar önceki oturum raporunda.

- **[2026-08-27] Next.js 16 + App Router seçildi, `middleware.ts` değil `proxy.ts` kullanılacak (henüz kullanılmadı)** — Next.js 16'da `middleware` dosya kuralı kaldırılıp `proxy`'ye yeniden adlandırıldı. Paket sürümü kontrol edilmeden eski adlandırma kullanılsaydı çalışmayan kod yazılmış olurdu; `node_modules/next/dist/docs/` içindeki güncel dokümantasyon doğrudan okunarak doğrulandı.

- **[2026-08-27] CSP: nonce tabanlı değil, `next.config.ts` üzerinden statik CSP** — Nonce tabanlı CSP tüm sayfaları dinamik render'a zorluyor (Next.js resmi dokümantasyonu), bu da projenin temel gereksinimi olan SSG/ISR pSEO mimarisini kırar. Bunun yerine Next.js'in resmi "Without Nonces" deseni kullanıldı (`script-src 'unsafe-inline'` içeriyor — bkz. `known-issues.md`).

- **[2026-08-27] Prisma sürümü: 8.0.0-rc.12 değil, 6.12.0'a sabitlendi** — `npm install prisma` varsayılan olarak bir release-candidate (8.0.0-rc.12, tamamen farklı "Prisma Developer Platform" CLI paradigması) kurdu. Ayrıca 7.x hattı `@prisma/config`'te yüksek önemli bir `deepmerge-ts` DoS güvenlik açığı taşıyordu (GHSA-ggr8-5vv4-36mx). 6.12.0 kararlı, iyi bilinen, sıfır güvenlik açığı raporlayan bir sürüm.

- **[2026-08-27] Dev veritabanı: SQLite, production için PostgreSQL'e geçiş planlanıyor** — Yerel geliştirme için sıfır-konfigürasyonlu SQLite kullanıldı (`prisma/dev.db`, git'e dahil değil). `schema.prisma`'daki `datasource` bloğu production öncesi `postgresql`'e çevrilmeli — bu düşük riskli, tersine çevrilebilir bir teknik detay, mimariyi etkilemiyor (tüm veri erişimi zaten Prisma Client üzerinden soyutlanmış durumda).

- **[2026-08-27] İl/marka URL çakışması: tek `[slug]` route + sunucu tarafı çözümleme** — `/adana-robot-supurge-servisi` ve `/roborock-robot-supurge-servisi` aynı sonek kalıbını paylaşıyor; Next.js App Router'da önek/sonek + dinamik parça karışık klasör adı desteklenmiyor. Çözüm: `src/app/[slug]/page.tsx` sonek'i ayıklayıp önce `Province`, sonra `Brand` tablosunda arıyor. Bkz. `src/lib/slugs.test.ts` için regresyon testleri.

- **[2026-08-27] Ödeme entegrasyonu kapsam dışı** — Kullanıcı onayı: servis talebi akışı şimdilik "ücretsiz arıza tespiti + teklif" modeliyle sınırlı, online tahsilat yok.

- **[2026-08-27] Kargo entegrasyonu: soyutlanmış `CarrierProvider` arayüzü + stub implementasyon** — Gerçek kargo ortağı henüz teyit edilmedi (`src/lib/carrier.ts`). Karar: UI/iş mantığı gerçek entegrasyondan bağımsız kalsın, ileride tek bir dosya değişikliğiyle gerçek sağlayıcıya geçilebilsin.

- **[2026-08-27] Marka logosu + tema rengi: Desktop'taki `logo.pdf`'ten çıkarıldı** — Vektör logo PyMuPDF ile SVG'ye dönüştürülüp (`public/logo.svg`, favicon için ayrı kırpılmış `src/app/icon.svg`) sitede kullanıldı. Tema rengi (`brand-*` Tailwind paleti, `src/app/globals.css`), logonun kendi vektör verisinden çıkarılan tam hex değerlerine (`#005e97` ana mavi, `#003b64` koyu vurgu) dayanıyor — tahmini değil.

- **[2026-08-27] Garanti süresi onaylandı: 6 Ay Garanti** — Daha önce (bu dosyada ve `known-issues.md`'de) rakip sitenin rakamı olduğu için kasıtlı olarak kullanılmamıştı. Kullanıcı bu oturumda doğrudan "6 ay garanti" yazılmasını istedi — bu artık tahmin değil, işletme sahibinin kendi onayı. `src/lib/site-config.ts`'teki `warrantyLabel` güncellendi ve TrustBadges ile hero'da kullanılıyor.

- **[2026-08-27] Telefon numarası onaylandı: 0362 431 19 19** — Kullanıcı tarafından doğrudan verildi (0362 = Samsun alan kodu, işletmenin konumuyla tutarlı). `site-config.ts`'teki placeholder değiştirildi; artık `TODO(confirm-before-launch)` değil.

- **[2026-08-27] Dark-mode CSS bug'ı düzeltildi, sabit-tema kararı** — Next.js scaffold'unun `prefers-color-scheme: dark` bloğu, katmansız (`@layer` dışı) bir `body{}` kuralı üzerinden Tailwind'in katmanlı `bg-white` utility'sini her zaman eziyordu (CSS Cascade Layers kuralı: katmansız kural her zaman katmanlı kuralı yener, specificity fark etmez) — bu, karanlık işletim sistemi temasında arka plan class'ı olmayan kart/bölümlerin siyah görünmesine yol açıyordu. Karar: bu sabit marka kimlikli bir işletme sitesi, ziyaretçinin OS temasına göre değişmemeli — dark-mode bloğu tamamen kaldırıldı.

- **[2026-08-27] Hero fotoğrafı: Pexels, standart ücretsiz lisans, önden çekim** — Kullanıcı "arkaplansız, önden" bir görsel istedi. Gerçekten şeffaf arka planlı VE tamamen ücretsiz/ticari kullanıma uygun lisanslı bir görsel bulunamadı (şeffaf PNG sunan siteler ya atıf gerektiriyor ya da marka telifi riski taşıyor — CleanPNG gibi bazıları doğrudan "iRobot Roomba" gibi tescilli ürün adlarıyla listeleniyor, kullanılmadı). Bunun yerine gerçekten önden çekilmiş, Pexels standart ücretsiz lisanslı bir fotoğraf (`public/hero-robot.jpg`, fotoğrafçı: Andrey Matveev) kullanıldı; arka plan düz değil ama marka değil, gerçek bir stüdyo/ev ortamı.

- **[2026-08-27] Marka logoları (mega menü): Wikimedia Commons'tan, lisansı belgelenmiş** — Roborock, Xiaomi, Samsung, iRobot, Ecovacs logoları "kamu malı / metin+basit şekil, telif eşiğinin altında" notuyla; Dreame logosu CC BY-SA 4.0 (atıf gerektirir: Dreame Technology, kaynak Wikimedia Commons) altında. Marka logolarının bir tamir servisinde "bu markaya bakıyoruz" amacıyla gösterilmesi (nominative fair use) — ortaklık/yetkili servis iddiası değil, sadece hizmet verilen markaların tanımlanması. Sadece gerçekten indirilen 6 marka logo alıyor; diğer 23 marka düz metin link olarak listeleniyor, logo uydurulmadı.
