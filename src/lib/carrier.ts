/**
 * Abstracted cargo carrier interface (MASTER_PROMPT.md §3, §8.2).
 *
 * The business has not confirmed which carrier(s) they actually use
 * (Yurtiçi / Aras / MNG / an aggregator such as Kargo Entegratör or Basit
 * Kargo). This interface lets the rest of the app depend on a stable
 * contract while that decision is made — implement `CarrierProvider` with
 * the real integration later without touching UI or route code.
 */

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
 * Stub implementation used until a real carrier integration is wired up.
 * Does not call any external API - safe to use in dev/tests. Replace with
 * a real provider (see `CarrierProvider`) once the business confirms which
 * cargo company they are contracted with.
 */
export class StubCarrierProvider implements CarrierProvider {
  async createShipment(
    input: CreateShipmentInput,
  ): Promise<CreateShipmentResult> {
    return {
      carrierName: "Kargo Ortağı (yapılandırılacak)",
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
