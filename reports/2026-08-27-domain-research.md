# Araştırma Raporu — Samsun Robot Hastanesi Domain Araştırması

**Tarih:** 2026-08-27
**Soru:** Robot süpürge teknik servisi pSEO platformu için mimari, içerik ve uyum gereksinimleri nelerdir?

## Yöntem

55 kaynak taranarak (WebSearch) + `robothastanesi.com.tr`'nin canlı sayfa yapısı doğrudan incelenerek (WebFetch — ana sayfa, bir il sayfası, bir marka sayfası) sentezlendi. Tam kaynak listesi ve bulgular bu oturumun sohbet geçmişinde (kullanıcıya "50+ Kaynaklık Araştırmadan Çıkan Sonuçlar" ve "Kaynak Listesi" başlıkları altında) sunuldu; bu rapor onun kalıcı özetidir.

## Temel Bulgular

1. **Rakip site yapısı:** Şablon tekrarı riski var (il sayfalarının çoğu bölümü kopya); bizim mimarimiz her il için gerçek veri (bölge, tahmini teslimat süresi, en çok talep edilen markalar) enjekte ediyor — bkz. `prisma/schema.prisma` `Province` modeli.
2. **pSEO teknik mimari:** Next.js App Router + SSG/ISR, `sitemap.ts` ile otomatik sitemap — uygulandı.
3. **Schema.org:** LocalBusiness + Service + BreadcrumbList her sayfada; FAQPage eklendi ama Google'ın Mayıs 2026 değişikliği nedeniyle rich result beklenmiyor.
4. **KVKK:** Aydınlatma metni + çerez politikası ayrı ayrı zorunlu, açık rıza şart, 30 gün yanıt süresi — yapısal olarak uygulandı, hukuki onay bekliyor.
5. **Batarya/Lidar teknik detaylar:** Spot kaynak (lehim değil), IEC 62133-2/UL 2054 referansları — `/atolye` sayfası içeriğine yansıtıldı.
6. **UX verileri:** 3-5 adımlı form %65-78 tamamlama oranı, sticky CTA %32,5 dönüşüm artışı — form/CTA tasarımına yansıtıldı.

## Kararlara Etkisi

Bu araştırma doğrudan `MASTER_PROMPT.md`'ye ve oradan da uygulamaya girdi. Ayrıntılı kaynak-karar eşlemesi için `decisions.md`'ye bakın.
