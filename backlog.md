# Backlog

## İçerik ölçeklendirme (2026-08-27 güncellemesi: il tarafı tamamlandı)

- [x] ~~81 il için içerik~~ — **tamamlandı.** `prisma/data/provinces.ts`: tüm 81 il, resmi plaka kodu + 7 coğrafi bölge, bölge bazlı gerçek iklim/kullanım farklılaştırmasıyla. Not: farklılaştırma **bölge seviyesinde** (7 farklı anlatı × il adı + hesaplanan teslimat süresi), tam anlamıyla şehir-bazlı özgün metin değil — bkz. `known-issues.md`.
- [x] ~~6→70+ marka~~ — **kısmen tamamlandı: 29 marka.** `prisma/data/brands.ts`: 23 yeni, gerçek/doğrulanmış marka (TCL, Anker Eufy, Narwal, Cecotec, Proscenic, Samsung, Philips, Karcher, Roidmi, Viomi, Hoover, Panasonic, Midea, Tefal, Rowenta, Shark, Grundig, Neabot, MOVA, Lefant, ILIFE, Miele, Vorwerk). **70+ hedefine ulaşmak için** işletmenin gerçek tedarikçi/ithalatçı kataloğu gerekiyor — bunu fabrikasyon yapmadım, veri kaynağı doğrulanmadan yeni marka eklemeyin.
- [ ] Marka başına model sayısının genişletilmesi (şu an sadece 3 marka için toplam 5 model var; 29 markanın çoğunda henüz model mikro-sayfası yok)
- [ ] İl bazlı "en çok talep edilen markalar" listesinin gerçek servis talebi verisine dayandırılması (şu an editöryel/bölgesel tahmine dayalı)

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
