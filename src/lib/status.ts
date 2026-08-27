import type { ServiceRequestStatus } from "@prisma/client";

export const STATUS_ORDER: ServiceRequestStatus[] = [
  "RECEIVED",
  "DIAGNOSED",
  "REPAIRING",
  "TESTING",
  "SHIPPED",
  "DELIVERED",
];

export const STATUS_LABELS: Record<ServiceRequestStatus, string> = {
  RECEIVED: "Talep Alındı",
  DIAGNOSED: "Arıza Tespiti Yapıldı",
  REPAIRING: "Onarımda",
  TESTING: "Test Ediliyor",
  SHIPPED: "Kargoya Verildi",
  DELIVERED: "Teslim Edildi",
};
