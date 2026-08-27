# Backlog

## Sıradaki büyük iş: içerik ölçeklendirme

- [ ] Kalan ~76 il için gerçek, özgün bölgesel içerik (şablon tekrarı olmadan — bkz. `MASTER_PROMPT.md` §5.1 thin-content uyarısı)
- [ ] Kalan ~64 marka için içerik
- [ ] Marka başına model sayısının genişletilmesi

## Entegrasyonlar

- [ ] Gerçek kargo firması entegrasyonu (`src/lib/carrier.ts`'deki `CarrierProvider` arayüzünü implemente et)
- [ ] GA4 + Google Tag Manager + Search Console kurulumu
- [ ] WhatsApp Business API (şu an sadece `wa.me` click-to-chat var)

## Hukuki / uyum

- [ ] KVKK aydınlatma metni ve çerez politikasının hukuk danışmanı tarafından onaylanması
- [ ] Gerçek işletme bilgilerinin `src/lib/site-config.ts`'e girilmesi (adres, telefon, garanti süresi)

## Teknik borç

- [ ] Servis talebi formuna rate limiting eklenmesi
- [ ] Playwright uçtan uca testlerinin kalıcı bir test paketine taşınması
- [ ] Production için SQLite → PostgreSQL geçişi
- [ ] Next.js deneysel SRI desteğiyle daha güçlü CSP değerlendirmesi

## Gelecek özellikler (spec gerektirir, henüz spec-to-acceptance'tan geçmedi)

- [ ] Ödeme/tahsilat akışı (kullanıcı onayıyla mevcut milestone'dan çıkarıldı)
- [ ] Servis talebi durumu için müşteriye SMS/e-posta bildirimi
