/**
 * Seed data for the FaqItem table (2026-08-28: migrated from a hardcoded
 * array in src/app/sss/page.tsx so FAQ entries are editable from
 * /admin/sss without a code deploy - see decisions.md).
 *
 * Plain text only (no inline links) - the original array on the page had
 * a couple of answers with embedded <Link>s for UX; that's a small,
 * deliberate trade-off for storing content in the database safely
 * without introducing dangerouslySetInnerHTML. The page can still carry
 * a short static "faydalı bağlantılar" block alongside the FAQ list.
 */
export interface FaqItemSeed {
  question: string;
  answer: string;
  sortOrder: number;
}

export const FAQ_ITEMS: FaqItemSeed[] = [
  {
    question: "Servis talebimi nasıl oluşturabilirim?",
    answer: "WhatsApp üzerinden veya web sitemizdeki servis talebi formunu doldurarak marka, model ve arıza bilgilerinizi bize iletebilirsiniz.",
    sortOrder: 1,
  },
  {
    question: "Arıza tespiti ücretli mi?",
    answer: "Hayır. Cihazınız merkezimize ulaştığında ücretsiz ve detaylı arıza tespiti yapıyoruz; onarım ücretini onaydan önce size bildiriyoruz.",
    sortOrder: 2,
  },
  {
    question: "Onayım olmadan onarıma başlıyor musunuz?",
    answer: "Hayır. Arıza tespiti sonrası ücret ve süreç hakkında sizi bilgilendiriyoruz, onayınızı almadan hiçbir işlem yapmıyoruz.",
    sortOrder: 3,
  },
  {
    question: "Cihazımı Samsun dışından nasıl gönderebilirim?",
    answer: "Servis talebi formunu doldurduktan sonra size özel bir kargo kodu ve gönderim talimatı iletiyoruz; Türkiye'nin 81 iline bu şekilde hizmet veriyoruz.",
    sortOrder: 4,
  },
  {
    question: "Hangi markalara bakıyorsunuz?",
    answer: "Roborock, Xiaomi, Dreame, Ecovacs, iRobot, Samsung dahil çok sayıda markada teknik servis veriyoruz. Tüm markaları /markalar sayfasından görüntüleyebilirsiniz.",
    sortOrder: 5,
  },
  {
    question: "Garanti süreniz ne kadar?",
    answer: "Yaptığımız tüm onarım ve batarya değişimleri 6 Ay Garanti kapsamındadır.",
    sortOrder: 6,
  },
  {
    question: "Orijinal yedek parça mı kullanıyorsunuz?",
    answer: "Onarımlarda orijinal veya orijinal eşdeğeri sertifikalı yedek parça kullanıyoruz; batarya paketlerimizi lehim değil, güvenli spot kaynak yöntemiyle üretiyoruz.",
    sortOrder: 7,
  },
  {
    question: "Cihazımın durumunu nasıl takip edebilirim?",
    answer: "/servis-takip sayfasından ad soyad ve telefon numaranızla cihazınızın güncel durumunu sorgulayabilirsiniz.",
    sortOrder: 8,
  },
  {
    question: "Kişisel verilerim nasıl korunuyor?",
    answer: "Kişisel verileriniz yalnızca servis talebinizin işlenmesi amacıyla kullanılır. Ayrıntılar için KVKK Aydınlatma Metni'ni inceleyebilirsiniz.",
    sortOrder: 9,
  },
  {
    question: "Cihazım onarılamayacak durumdaysa ne olur?",
    answer: "Arıza tespiti sonucunda onarımın ekonomik veya teknik olarak mümkün olmadığı durumları size açıkça bildiriyoruz; onayınız olmadan herhangi bir ücret talep etmiyoruz.",
    sortOrder: 10,
  },
  {
    question: "Merkeziniz nerede?",
    answer: "Merkezimiz Kale Mah. Kasaplar Cad. No:16, İlkadım/Samsun adresinde bulunuyor. Çalışma saatlerimiz: Pzt-Cmt 08:30-19:30.",
    sortOrder: 11,
  },
];
