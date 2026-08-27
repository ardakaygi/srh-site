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
