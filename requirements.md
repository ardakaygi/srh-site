# Gereksinimler ve Kabul Kriterleri

Kaynak: [`MASTER_PROMPT.md`](./MASTER_PROMPT.md) (tam spesifikasyon). Bu dosya, ilk milestone için somut kabul kriterlerini ve durumlarını izler.

## İlk Milestone — Definition of Done (MASTER_PROMPT.md §12)

- [x] Homepage, ≥3 gerçek il sayfası, ≥3 gerçek marka sayfası, ≥2 model sayfası canlı ve thin-content kontrolünden geçiyor (5 il, 6 marka, 5 model; her sayfa bölgeye/markaya özgü gerçek metin içeriyor, şablon tekrarı yok)
- [x] 81 il ve 70+ marka için tam veri modeli hazır (Prisma şeması), mimari tasarım yeniden yapılandırma gerektirmeden tam ölçeğe destekliyor (içerik girişi ayrı iş — bkz. `backlog.md`)
- [x] Servis talebi çok adımlı formu uçtan uca çalışıyor, KVKK rızası zorunlu, temel WCAG kontrol edildi (etiketler, `autocomplete`, hata mesajları)
- [x] Takip sayfası en az bir stub `CarrierProvider`'a karşı çalışıyor
- [x] Schema.org işaretlemesi her sayfa tipinde mevcut (LocalBusiness+Service+FAQPage+BreadcrumbList) — Google Rich Results Test ile **doğrulanmadı** (elle test edilmedi, sadece yapısal olarak doğru JSON üretildiği teyit edildi)
- [ ] Core Web Vitals ölçümü (Lighthouse) — **yapılmadı**
- [x] `/security-review` çalıştırıldı (bu doküman güncellenirken devam ediyor)
- [x] KVKK aydınlatma metni ve çerez politikası sayfaları mevcut (hukuki onay bekliyor, açıkça işaretli)
- [x] Tam dil taraması: render edilen çıktıda İngilizce görünür metin yok (elle + ekran görüntüsüyle kontrol edildi)

## Fonksiyonel Gereksinimler

1. **pSEO yönlendirme motoru** — il (`/[il]-robot-supurge-servisi`), marka (`/[marka]-robot-supurge-servisi`), model (`/model/[marka]-[model]`) sayfaları, DB'den üretiliyor. ✅ Uygulandı.
2. **Teknik servis & batarya laboratuvarı vitrini** (`/atolye`) — ✅ Uygulandı.
3. **Çok adımlı servis talebi + kargo takip akışı** — ✅ Uygulandı (kargo entegrasyonu stub).
4. **Mobil öncelikli dönüşüm UX** (WhatsApp, sticky CTA, güven rozetleri) — ✅ Uygulandı.

## Fonksiyonel Olmayan Gereksinimler

- **Dil:** Tüm kullanıcıya görünen içerik Türkçe — ✅ Doğrulandı.
- **Güvenlik başlıkları:** CSP/HSTS/X-Frame-Options/Referrer-Policy — ✅ Uygulandı, tarayıcıda header varlığı doğrulandı.
- **KVKK:** Aydınlatma metni + çerez politikası + açık rıza kutusu — ✅ Yapısal olarak var, hukuki onay **bekliyor**.
- **Performans (Core Web Vitals):** **Ölçülmedi** — backlog'a eklendi.
- **Erişilebilirlik (WCAG 2.2):** Form etiketleri, `autocomplete`, hata mesajları uygulandı; tam bir WCAG denetimi (ekran okuyucu testi, kontrast oranı ölçümü) **yapılmadı**.

## Açıkça Ertelenen / Kapsam Dışı

- Online ödeme/tahsilat (kullanıcı onayıyla)
- Gerçek işletme bilgileri, gerçek kargo firması, gerçek garanti süresi (bkz. `src/lib/site-config.ts` TODO'ları)
