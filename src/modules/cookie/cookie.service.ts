import crypto from "crypto";
import { config } from "dotenv";
config();

export class CookieService {
  private secret: string = `${process.env.COOKIE_SECRET}`;

  // You can Enter Secret Key
  constructor(secret?: string) {
    if (secret) this.secret = secret;
  }

  sign(data: string): string {
    const hash = crypto.createHash("sha256").update(data).digest("hex");

    // Create a HMAC (SHA-256) signature of the hash
    const hmac = crypto.createHmac("sha256", this.secret);
    hmac.update(hash);
    const signature = hmac.digest("hex");

    return `${hash}.${signature}`;
  }

  verify(data: string): boolean {
    if (data === undefined) return false;
    const [RecivedHash, receivedSignature] = data.split(".");
    const hmac = crypto.createHmac("sha256", this.secret);
    hmac.update(RecivedHash);
    const computedSignature = hmac.digest("hex");

    // Return False or true
    return computedSignature === receivedSignature;
  }
}
