import crypto from 'crypto';
import { config } from 'dotenv';
config();
import { logger } from '../../core/logging/logger';
import { SessionEntity } from '../../models/session.entity';
import { SessionRepository } from '../../modules/auth/session.repository';

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

type TVerify = { status: boolean; hash: string };
//

export class CookieService {
  private sessionRepository: SessionRepository = new SessionRepository();

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

  verify(data: string): TVerify {
    if (data === undefined) return { status: false, hash: '' };
    try {
      const [recivedHash, receivedSignature] = data.split('.');
      const hmac = crypto.createHmac('sha256', this.secret);
      hmac.update(recivedHash);
      const computedSignature = hmac.digest('hex');

      if (computedSignature !== receivedSignature) return { status: false, hash: '' };

      return {
        status: true,
        hash: recivedHash,
      };
    } catch (error) {
      logger.error('Error Cooki/Session Verification', error);
      return { status: false, hash: '' };
    }
  }

  public checkExpireCookie(sessionExpire: number) {
    const now = Date.now();

    if (now >= sessionExpire) {
      return true;
    }

    return false;
  }

  async ExpiringSession(sessionData: SessionEntity) {
    sessionData.is_valid = false;
    await this.sessionRepository.save(sessionData);
  }
}
