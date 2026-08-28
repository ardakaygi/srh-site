/**
 * Abstracted cargo carrier interface (MASTER_PROMPT.md §3, §8.2).
 *
 * The business confirmed their carrier is Yurtiçi Kargo (2026-08-28, see
 * decisions.md and site-config.ts's cargoPartnerName) but a real API
 * integration (credentials, shipment creation, live tracking URLs) has
 * not been built yet — this interface lets the rest of the app depend on
 * a stable contract while that's done; implement `CarrierProvider` with
 * the real integration later without touching UI or route code.
 */

import { siteConfig } from "@/lib/site-config";

export interface CreateShipmentInput {
  serviceRequestId: string;
  trackingCode: string;
  customerName: string;
  customerPhone: string;
  addressLine: string;
  provinceName: string;
}

export interface CreateShipmentResult {
  carrierName: string;
  carrierTrackingUrl: string;
}

export interface CarrierProvider {
  createShipment(input: CreateShipmentInput): Promise<CreateShipmentResult>;
  getTrackingUrl(carrierTrackingCode: string): string;
}

/**
 * Stub implementation used until a real Yurtiçi Kargo API integration is
 * wired up (no credentials/contract details yet). Does not call any
 * external API - safe to use in dev/tests. The display name is real
 * (site-config.ts's cargoPartnerName); only the actual shipment-creation
 * and live tracking URL are placeholders.
 */
export class StubCarrierProvider implements CarrierProvider {
  async createShipment(
    input: CreateShipmentInput,
  ): Promise<CreateShipmentResult> {
    return {
      carrierName: siteConfig.cargoPartnerName,
      carrierTrackingUrl: `/servis-takip?kod=${encodeURIComponent(input.trackingCode)}`,
    };
  }

  getTrackingUrl(carrierTrackingCode: string): string {
    return `/servis-takip?kod=${encodeURIComponent(carrierTrackingCode)}`;
  }
}

export function getCarrierProvider(): CarrierProvider {
  return new StubCarrierProvider();
}
