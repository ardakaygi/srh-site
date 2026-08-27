/**
 * Real, licensed landmark photos for province pages (src/components/pseo/
 * ProvincePageContent.tsx), sourced from Wikimedia Commons and verified
 * (license + that the photo actually depicts the named landmark) before
 * being added here - see decisions.md for the sourcing note and
 * src/app/telif-ve-marka-bildirimi/page.tsx for the public attribution.
 *
 * Only a first batch of major provinces is covered so far (deliberately
 * incremental, not fabricated placeholders) - a province with no entry
 * here simply renders without a landmark image; ProvincePageContent must
 * not assume every province has one.
 */
export interface ProvinceLandmark {
  src: string;
  alt: string;
  credit: string; // short on-page caption, e.g. "Fotoğraf: X · CC BY-SA 4.0"
}

export const PROVINCE_LANDMARKS: Record<string, ProvinceLandmark> = {
  samsun: {
    src: "/province-landmarks/samsun.jpg",
    alt: "Samsun'daki Onur Anıtı (Atatürk heykeli)",
    credit: "Fotoğraf: Zeynel Cebeci · CC BY-SA 4.0",
  },
  istanbul: {
    src: "/province-landmarks/istanbul.jpg",
    alt: "İstanbul Boğaziçi Köprüsü",
    credit: "Fotoğraf: İlke Bahçeci · CC0",
  },
  ankara: {
    src: "/province-landmarks/ankara.jpg",
    alt: "Ankara'daki Anıtkabir",
    credit: "Fotoğraf: A.Savin, Wikipedia · Özgür Sanat Lisansı",
  },
  izmir: {
    src: "/province-landmarks/izmir.jpg",
    alt: "İzmir Saat Kulesi",
    credit: "Fotoğraf: Carlos Delgado · CC BY-SA 3.0",
  },
  bursa: {
    src: "/province-landmarks/bursa.jpg",
    alt: "Bursa Ulu Camii ve çift minaresi",
    credit: "Fotoğraf: Beñat Irasuegi · CC BY-SA 4.0",
  },
  antalya: {
    src: "/province-landmarks/antalya.jpg",
    alt: "Antalya Saat Kulesi",
    credit: "Fotoğraf: Sharon Hahn Darlin · CC BY 2.0",
  },
};
