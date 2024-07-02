import crypto from 'crypto';
import { config } from 'dotenv';
config();

// Variables
export const MAX_AGE = 1000 * 60; // should be Five Day
export const IN_PRODUCTION = process.env.NODE_ENV === 'production';
//

// types and interfaces
type TSign = {
  hash: string;
  signature: string;
  value: string;
};

//

export class CookieService {
  private secret: string;

  // // you can use  this
  // public CookieOptions = {
  //   maxAge: MAX_AGE,
  //   httpOnly: true,
  //   secure: IN_PRODUCTION,
  //   sameSite: 'strict' // Or 'lax' Or 'none'
  // };

  constructor(secret: string) {
    this.secret = secret;
  }

  sign(data: string): TSign {
    const hash = crypto.createHash('sha256').update(data).digest('hex');

    const hmac = crypto.createHmac('sha256', this.secret);
    hmac.update(hash);
    const signature = hmac.digest('hex');

    return {
      hash: hash,
      signature: signature,
      value: `${hash}.${signature}`,
    };
  }

  verify(data: string): boolean {
    if (data === undefined) return false;
    const [RecivedHash, receivedSignature] = data.split('.');
    const hmac = crypto.createHmac('sha256', this.secret);
    hmac.update(RecivedHash);
    const computedSignature = hmac.digest('hex');

    return computedSignature === receivedSignature;
  }
}
