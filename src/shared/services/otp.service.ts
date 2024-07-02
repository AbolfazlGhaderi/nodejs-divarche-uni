import NodeCache from 'node-cache';
import crypto from 'crypto';

export class OtpService {
  private CACHE: NodeCache = new NodeCache();

  // Save Otp Code
  /**
   * ttl: Seconds
   * @param key
   * @param value
   * @param ttl
   */
  async SetOtp(key: string, value: string, ttl: number) {
    this.CACHE.set(key, value, ttl);
  }

  // Get Otp Code
  async GetOtp(key: string) {
    return this.CACHE.get(key);
  }

  // Generate Otp Code
  public GenerateOtpCode(length: number): string {
    return crypto.randomInt(10 ** (length - 1), 10 ** length - 1).toString();
  }
}
