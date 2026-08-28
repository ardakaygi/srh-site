"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdminSession } from "@/lib/adminAuth";
import type { ServiceRequestStatus } from "@prisma/client";

const VALID_STATUSES: ServiceRequestStatus[] = [
  "RECEIVED",
  "DIAGNOSED",
  "REPAIRING",
  "TESTING",
  "SHIPPED",
  "DELIVERED",
];

export type UpdateStatusState = { error?: string; success?: boolean };

export async function updateServiceRequestStatusAction(
  _prevState: UpdateStatusState,
  formData: FormData,
): Promise<UpdateStatusState> {
  await assertAdminSession();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const note = String(formData.get("note") ?? "").trim();

  if (!id) return { error: "Geçersiz talep." };
  if (!VALID_STATUSES.includes(status as ServiceRequestStatus)) {
    return { error: "Geçersiz durum." };
  }

  const existing = await prisma.serviceRequest.findUnique({ where: { id } });
  if (!existing) return { error: "Talep bulunamadı." };

  await prisma.serviceRequest.update({
    where: { id },
    data: {
      status: status as ServiceRequestStatus,
      statusEvents: {
        create: {
          status: status as ServiceRequestStatus,
          note: note || null,
        },
      },
    },
  });

  revalidatePath(`/admin/servis-talepleri/${id}`);
  revalidatePath("/admin/servis-talepleri");
  revalidatePath("/servis-takip");

  return { success: true };
}
