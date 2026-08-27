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

**Sıradaki adım (bu oturumda tamamlandı):** İçerik ölçeklendirme.

## 2026-08-27 (devam) — İçerik ölçeklendirme: 81 il + 29 marka

**Tamamlanan:**
1. `prisma/data/provinces.ts` — resmi plaka kodu + 7 coğrafi bölge tablosuyla **tüm 81 il**, bölge bazlı gerçek iklim/kullanım farklılaştırmasıyla (bkz. `known-issues.md` — bölge seviyesinde farklılaşma, şehir seviyesinde değil)
2. `prisma/data/brands.ts` — 23 yeni, gerçek/doğrulanmış marka (toplam 29)
3. `seed.ts` güncellendi, bu iki dosyadan besleniyor
4. **Kanıt:** `npx tsx prisma/seed.ts` → `{brands: 29, models: 5, provinces: 81}`; `npm run build` → 129 sayfa, 3.8sn'de statik üretildi, hata yok; `npm run lint && npm run typecheck && npm run test` → hepsi temiz (11/11 test)
5. Playwright ile 6 yeni sayfa (2 il çifti aynı bölgeden, 2 farklı bölgeden il, 2 yeni marka) ziyaret edildi, ekran görüntüleriyle gerçek içerik farklılaşması doğrulandı (Van: kış/batarya teması, Mardin: sıcaklık teması — farklı; Mardin/Şanlıurfa aynı bölge, benzer ama il adı + hesaplanan süre farklı)

**Sıradaki adım:** `backlog.md`'deki kalan işler — model kapsamının genişletilmesi, gerçek marka kataloğu ile 70+ hedefine ulaşma, entegrasyonlar (kargo/analytics), hukuki onaylar.

## 2026-08-27 (devam) — Marka kimliği ve UX yenileme

Kullanıcının Desktop'taki `logo.pdf` dosyası ve üç referans görsel (`siteorn1.png`, `hizmetorn.png`, `headerorn.png`, `popuporn.png`) temel alınarak sitenin görsel kimliği baştan tasarlandı.

**Tamamlanan:**
1. Vektör logo `logo.pdf`'ten çıkarıldı (`public/logo.svg`, favicon `src/app/icon.svg`), tema rengi logonun kendi hex değerlerinden (`#005e97`/`#003b64`) türetildi.
2. Gerçek bir dark-mode CSS bug'ı bulunup düzeltildi (scaffold'un katmansız `body{}` kuralı, karanlık OS temasında arka plansız kartları siyaha çeviriyordu).
3. Hero bölümü tamamen yenilendi: iki kolon, dönen arıza ifadesi başlığı (CSS grid-stacking, JS'siz), lisanslı ürün fotoğrafı (Pexels), yüzen özellik kartları.
4. Teknik Servis Kapsamımız bölümü ikon+checklist+CTA formatına geçirildi, 12 kategori özgün metinle yeniden yazıldı.
5. Header iki katmanlı yapıya (üst bilgi çubuğu + ana menü) geçirildi, gerçek marka logolu bir "Markalar" mega menüsü eklendi (6 marka logosu Wikimedia Commons'tan, lisansları `decisions.md`'de belgelendi; Dreame için CC BY-SA atfı footer'a eklendi).
6. **Kritik mobil hatalar bulunup düzeltildi:** (a) Header'da mobilde hiç nav linki yoktu — hamburger menü eklendi; (b) dönen başlık metni mobilde tüm sayfayı yatay taşırıyordu (nowrap + dar max-width) — CSS grid-stacking + koşullu wrap ile düzeltildi.
7. Anasayfadaki marka/il listeleri artık 6'şar öğelik küratörlü önizleme gösteriyor (tam liste `/markalar` ve `/hizmet-bolgeleri`'de) — önceki hâliyle sayfa mobilde ~13.600px uzunluğundaydı.
8. Gerçek işletme bilgileri onaylandı: telefon (0362 431 19 19), 6 ay garanti — `site-config.ts` güncellendi.

**Kanıt:** Her değişiklikten sonra `npm run build && npm run lint && npm run typecheck` çalıştırıldı (hepsi temiz), oturum sonunda tam Playwright e2e testi tekrar koşuldu (ana akış hâlâ çalışıyor), masaüstü (1440px) ve mobil (375-390px) genişliklerde ekran görüntüleriyle görsel doğrulama yapıldı.

**Sıradaki adım:** `backlog.md`'deki kalan işler değişmedi (model kapsamı, 70+ marka kataloğu, entegrasyonlar, hukuki onaylar).
