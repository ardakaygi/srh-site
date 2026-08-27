# İlerleme Kaydı

## 2026-08-27 — İlk milestone: çalışan iskelet

**Tamamlanan:**
1. Next.js 16 (App Router, TS, Tailwind v4) scaffold — `npm run build` başarılı (kanıt: build çıktısı, tüm rotalar statik/ISR/dinamik olarak doğru işaretlendi)
2. Git deposu başlatıldı, her adım ayrı commit olarak kaydedildi (bkz. `git log`)
3. Prisma şeması (SQLite dev) + seed verisi: 5 il, 6 marka, 5 model (kanıt: `npx tsx prisma/seed.ts` çıktısı)
4. Homepage, il/marka birleşik `[slug]` rotası, model mikro-sayfaları, `/markalar`, `/hizmet-bolgeleri` indeksleri
5. `sitemap.ts` + `robots.ts`
6. Çok adımlı servis talebi formu (Zod doğrulamalı server action, Prisma'ya yazıyor)
7. `/servis-takip` durum takip sayfası
8. Güvenlik başlıkları (`next.config.ts` — CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) + KVKK/çerez/atölye/iletişim sayfaları
9. Vitest birim testleri (`slugs.ts`, `tracking.ts` — 11/11 geçiyor)
10. **Uçtan uca tarayıcı testi (Playwright, kanıt bu oturumda çalıştırıldı):** anasayfa → il sayfası → marka sayfası → model sayfası → geçersiz slug için 404 → 4 adımlı servis talebi formu tamamlandı → `SRH-T24JG8EX` takip kodu üretildi → takip sayfasında doğru durum gösterildi → geçersiz kod için "bulunamadı" mesajı (çökme yok). Ekran görüntüleri kullanıcıya gönderildi.
11. `npm run build`, `npm run lint`, `npm run typecheck`, `npm run test` — hepsi temiz.

**Kanıt komutları:**
```
npm run build     # ✓ Compiled successfully, 30 route üretildi
npm run lint      # çıktı yok = temiz
npm run typecheck # çıktı yok = temiz
npm run test      # 11 passed (11)
```

**`/code-review` + `/security-review` sonucu (aynı gün):** 1 orta-önemli güvenlik bulgusu (telefonla PII sorgulama — ikinci faktörsüz) ve 4 kod kalitesi bulgusu (telefon formatı uyuşmazlığı, kargo hatası rollback eksikliği, N+1 sorgu, sabit kodlanmış sonek) tespit edildi ve hepsi düzeltildi + Playwright ile doğrulandı. 1 bulgu (`allowScripts` package.json alanı) yanlış pozitif olarak elendi (bu oturumda bizzat test edilerek). Detaylar: `known-issues.md`.

**Kanıt:** `npm run build && npm run lint && npm run typecheck && npm run test` düzeltmelerden sonra tekrar çalıştırıldı, hepsi temiz. Hedefli bir Playwright script'i (`verify_fix.py`) 4 senaryoyu doğruladı: takip kodu sorgusu çalışıyor; sadece telefonla sorgu veri sızdırmıyor; yanlış isim+telefon veri sızdırmıyor; doğru isim + farklı formatlı telefon isteği buluyor.

**Sıradaki adım:** `backlog.md`'deki içerik ölçeklendirme ve entegrasyon işleri.
