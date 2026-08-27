/**
 * Real 5-star Google reviews for the business, transcribed by the business
 * owner directly from the company's own Google Business Profile
 * (https://share.google/8Oomb97N11z51Rv5e) - confirmed in-session
 * (2026-08-27), see decisions.md. Reviewer names are shown exactly as the
 * owner masked them (full first name, truncated surname + asterisks) per
 * their own request that names not be fully shown.
 *
 * Do NOT add entries here that are not genuine, owner-confirmed reviews -
 * this file exists specifically because fabricated testimonials were
 * refused earlier in the project history (see decisions.md).
 */
export interface GoogleReview {
  name: string;
  rating: 5;
  text: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  { name: "Ahmet CÖ****", rating: 5, text: "Süpürgemin bataryası bitmişti, aynı gün değişim yapıp teslim ettiler. İşçilik gerçekten harika, elinize sağlık!" },
  { name: "Beyza YI****", rating: 5, text: "Servisin “tamir olmaz, yenisini alın” dediği robot süpürgemi ilk günkü performansına döndürdüler. Dürüst esnaflık diye buna derim." },
  { name: "Cemal KO****", rating: 5, text: "Cihazı teslim ettikten sonra her aşamada bilgilendirildim. Şeffaf ve son derece profesyonel bir süreçti, teşekkürler." },
  { name: "Deniz AR****", rating: 5, text: "Robot süpürgenin tekerlek ve fırça arızasını kısa sürede çözdüler. Fiyatlar da yetkili servislere kıyasla gayet makul." },
  { name: "Emre ŞA****", rating: 5, text: "Güler yüzlü hizmet, doğru teşhis ve hızlı çözüm. Samsun'da bu işi yapan en iyi teknik servis kesinlikle burası." },
  { name: "Gizem AK****", rating: 5, text: "Özel batarya yenileme hizmeti aldım. Süpürgenin çekim gücü ve çalışma süresi fabrikadan ilk çıktığı güne döndü." },
  { name: "Hasan GÜ****", rating: 5, text: "Ana kart arızası olan cihazımı diğer yerler yapamamıştı ama burada kısa sürede hallettiler. Tam bir usta işi!" },
  { name: "İrem ÖZ****", rating: 5, text: "Robot süpürgenizin dili değiştiyse veya sensör hatası veriyorsa hiç düşünmeden getirin. Sorunu nokta atışı tespit edip çözüyorlar." },
  { name: "Kemal YI****", rating: 5, text: "Piyasadaki yedek parça kalitesizliğinden çekiniyordum ama kullandıkları parçalar son derece kaliteli ve garantili." },
  { name: "Merve ER****", rating: 5, text: "Sadece tamir yapmıyorlar, cihazı uzun ömürlü nasıl kullanacağınız konusunda da çok faydalı tavsiyeler veriyorlar." },
  { name: "Nur DE****", rating: 5, text: "İletişim harika, işçilik tertemiz. Samsun'da robot süpürge konusunda tek adres!" },
  { name: "Oğuz ŞA****", rating: 5, text: "Çöp diye düşündüğümüz cihazı hayata döndürdünüz, çok teşekkürler Samsun Robot Hastanesi!" },
  { name: "Pelin ÖZ****", rating: 5, text: "Hizmet kalitesi, hız ve uygun fiyat bir arada. Gözü kapalı güvenebilirsiniz." },
  { name: "Selin ÇE****", rating: 5, text: "Teknik bilgisi yüksek, çözüm odaklı ve çok ilgili bir işletme. Kesinlikle tavsiye ederim." },
  { name: "Yasin YA****", rating: 5, text: "Robot süpürgemize tam anlamıyla hastane bakımı yapılmış, pırıl pırıl teslim aldım. Eline sağlık ustam." },
];

/** Link to the business's real Google Business Profile. */
export const GOOGLE_PROFILE_URL = "https://share.google/8Oomb97N11z51Rv5e";
