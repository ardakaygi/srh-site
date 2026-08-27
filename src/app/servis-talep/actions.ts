"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCarrierProvider } from "@/lib/carrier";
import { generateTrackingCode } from "@/lib/tracking";

const ServiceRequestSchema = z.object({
  brandId: z.string().min(1, "Lütfen bir marka seçin."),
  modelName: z.string().trim().max(120).optional().default(""),
  faultDescription: z
    .string()
    .trim()
    .min(10, "Arıza açıklaması en az 10 karakter olmalı.")
    .max(2000),
  customerName: z.string().trim().min(2, "Ad soyad zorunludur.").max(120),
  customerPhone: z
    .string()
    .trim()
    .regex(/^[0-9+()\s-]{10,20}$/, "Geçerli bir telefon numarası girin."),
  provinceId: z.string().min(1, "Lütfen ilinizi seçin."),
  addressLine: z.string().trim().min(10, "Adres en az 10 karakter olmalı.").max(500),
  // Native checkbox sends "on" when checked, absent when unchecked - validated manually below
  // rather than via z.literal to sidestep zod v4's per-field error-customization API.
  kvkkConsent: z.string().optional(),
});

export type ServiceRequestFormState = {
  status: "idle" | "error" | "success";
  errors?: Record<string, string>;
  trackingCode?: string;
};

export async function submitServiceRequest(
  _prevState: ServiceRequestFormState,
  formData: FormData,
): Promise<ServiceRequestFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = ServiceRequestSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors };
  }

  const data = parsed.data;

  if (data.kvkkConsent !== "on") {
    return {
      status: "error",
      errors: {
        kvkkConsent:
          "Devam etmek için KVKK Aydınlatma Metni'ni onaylamanız gerekir.",
      },
    };
  }

  const [brand, province] = await Promise.all([
    prisma.brand.findUnique({ where: { id: data.brandId } }),
    prisma.province.findUnique({ where: { id: data.provinceId } }),
  ]);

  if (!brand) {
    return { status: "error", errors: { brandId: "Seçilen marka bulunamadı." } };
  }
  if (!province) {
    return { status: "error", errors: { provinceId: "Seçilen il bulunamadı." } };
  }

  const trackingCode = generateTrackingCode();

  const serviceRequest = await prisma.serviceRequest.create({
    data: {
      trackingCode,
      brandId: brand.id,
      modelName: data.modelName || null,
      faultDescription: data.faultDescription,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      provinceId: province.id,
      addressLine: data.addressLine,
      kvkkConsent: true,
      statusEvents: {
        create: {
          status: "RECEIVED",
          note: "Servis talebiniz alındı.",
        },
      },
    },
  });

  const carrier = getCarrierProvider();
  const shipment = await carrier.createShipment({
    serviceRequestId: serviceRequest.id,
    trackingCode,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    addressLine: data.addressLine,
    provinceName: province.name,
  });

  await prisma.serviceRequest.update({
    where: { id: serviceRequest.id },
    data: {
      carrierName: shipment.carrierName,
      carrierTrackingUrl: shipment.carrierTrackingUrl,
    },
  });

  return { status: "success", trackingCode };
}
