# Spec: İlk Milestone — Çalışan İskelet

**Durum:** Tamamlandı (2026-08-27)
**Kaynak spec:** [`MASTER_PROMPT.md`](../MASTER_PROMPT.md) §12 (Definition of Done)

Bu dosya, master prompt'un genel spesifikasyonundan bu oturumda gerçekten uygulanan ilk milestone'un görev kırılımını kayıt altına alır (`planning-and-task-breakdown` disiplinine göre).

## Görevler ve Doğrulama Komutları

| # | Görev | Doğrulama |
|---|---|---|
| 1 | Next.js scaffold | `npm run build` |
| 2 | Git init | `git log --oneline` |
| 3 | Prisma şeması (SQLite) | `npx prisma validate` (6.12.0 CLI ile) |
| 4 | Seed verisi | `npm run db:seed` |
| 5 | Homepage | `npm run build` + görsel kontrol |
| 6-7 | İl/marka birleşik route | `npm run build` (generateStaticParams çıktısında 11 sayfa) |
| 8 | Model mikro-sayfaları | `npm run build` (5 sayfa) |
| 9 | sitemap.ts / robots.ts | `npm run build` |
| 10 | Servis talebi formu | Playwright uçtan uca test |
| 11 | Kargo takip sayfası | Playwright uçtan uca test |
| 12 | Güvenlik başlıkları + KVKK/çerez sayfaları | Playwright ile header kontrolü |
| 13 | Kalite kapısı | `npm run lint && npm run typecheck && npm run test` |
| 14 | Code review + security review | Bu dosyanın güncellenmesiyle eşzamanlı |

## Sonraki Spec

`backlog.md`'deki "İçerik ölçeklendirme" ve "Entegrasyonlar" bölümleri, bir sonraki `spec-to-acceptance` çalıştırmasının girdisi olmalı.
