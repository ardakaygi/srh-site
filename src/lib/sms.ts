/**
 * Abstracted SMS provider, mirroring the CarrierProvider pattern in
 * carrier.ts. The concrete implementation targets Verimor's real,
 * documented HTTP API (verified against the official docs at
 * https://github.com/verimor/SMS-API/blob/master/user_guide.md and
 * https://developer.verimor.com.tr/ - not guessed), since the business
 * confirmed they have a Verimor account (2026-08-27, see decisions.md).
 *
 * Credentials are read from environment variables only - never hardcode
 * or commit real API credentials. Copy .env.example's VERIMOR_* keys into
 * .env with the real account values to activate sending; without them
 * this falls back to a no-op stub so local dev/tests never make a real
 * network call.
 */

export interface SmsProvider {
  sendSms(toMsisdn: string, message: string): Promise<void>;
}

const VERIMOR_ENDPOINT = "https://sms.verimor.com.tr/v2/send.json";

export class VerimorSmsProvider implements SmsProvider {
  constructor(
    private readonly username: string,
    private readonly password: string,
    private readonly sourceAddr: string,
  ) {}

  async sendSms(toMsisdn: string, message: string): Promise<void> {
    const response = await fetch(VERIMOR_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.username,
        password: this.password,
        source_addr: this.sourceAddr,
        messages: [{ msg: message, dest: toMsisdn }],
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(`Verimor SMS API ${response.status}: ${body}`);
    }
  }
}

/** No-op fallback used until real Verimor credentials are configured - logs instead of sending. */
class StubSmsProvider implements SmsProvider {
  async sendSms(toMsisdn: string, message: string): Promise<void> {
    console.log(`[stub SMS - VERIMOR_* env vars not set] to ${toMsisdn}: ${message}`);
  }
}

export function getSmsProvider(): SmsProvider {
  const username = process.env.VERIMOR_USERNAME;
  const password = process.env.VERIMOR_PASSWORD;
  const sourceAddr = process.env.VERIMOR_SOURCE_ADDR;

  if (!username || !password || !sourceAddr) {
    return new StubSmsProvider();
  }
  return new VerimorSmsProvider(username, password, sourceAddr);
}
