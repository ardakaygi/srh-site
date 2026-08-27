# Proje Bağlamı — Samsun Robot Hastanesi

## Amaç

Samsun merkezli bir robot süpürge teknik servisi için, `www.robothastanesi.com.tr`'den ilham alan, programatik SEO (pSEO) tabanlı bir web platformu. 81 il × 70+ marka × model bazında otomatik ama gerçekten özgün içerikli sayfa üretimi ana büyüme motoru; buna ek olarak teknik atölye vitrini, çok adımlı servis talep formu ve kargo/servis takip sistemi.

Tam spesifikasyon: [`MASTER_PROMPT.md`](./MASTER_PROMPT.md) — 50+ kaynaklık araştırmadan üretilen, uygulanabilir İngilizce master prompt.

## Teknoloji Yapısı

- **Framework:** Next.js 16 (App Router, Turbopack), TypeScript, React 19
- **Stil:** Tailwind CSS v4 (CSS-first config, `tailwind.config.js` yok)
- **Veri:** Prisma ORM 6.12.0 + SQLite (dev) — `DATABASE_URL` ile production'da PostgreSQL'e geçilebilir (bkz. `decisions.md`)
- **Form doğrulama:** Zod 4
- **Test:** Vitest (birim testler), Playwright (manuel/geçici uçtan uca duman testi — kalıcı test paketine henüz eklenmedi, bkz. `known-issues.md`)
- **Git:** Yerel repo, henüz uzak (remote) yok

## Kullanıcılar

- **Son kullanıcı:** Robot süpürgesi arızalanan, Türkiye'nin herhangi bir ilinden servis talebinde bulunan tüketici (Türkçe konuşan, mobil ağırlıklı).
- **İşletme sahibi:** Samsun Robot Hastanesi işletmecisi — gerçek işletme bilgileri (adres, telefon, garanti süresi, kargo ortağı) henüz teyit edilmedi (bkz. `src/lib/site-config.ts` içindeki `TODO(confirm-before-launch)` işaretleri).

## Mevcut Durum (27 Ağustos 2026 itibarıyla)

İlk milestone (MASTER_PROMPT.md §12 "Definition of Done") tamamlandı: çalışan bir iskelet — homepage, 5 il sayfası, 6 marka sayfası, 5 model sayfası, çok adımlı servis talebi formu (uçtan uca test edildi), kargo/servis takip sayfası, güvenlik başlıkları, KVKK/çerez taslak sayfaları. Detaylar için `progress.md`.

**Kapsam dışında bırakılan (henüz yapılmadı):** 81 ilin/70+ markanın tamamının gerçek içerikle doldurulması (mimari bunu destekliyor, veri girişi ayrı bir iş), gerçek kargo firması entegrasyonu, ödeme sistemi (kullanıcı onayıyla kapsam dışı bırakıldı), GA4/GTM analytics, hukuki onaylı KVKK metni.
