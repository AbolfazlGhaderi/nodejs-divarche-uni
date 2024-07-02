import JWT, { JwtPayload } from 'jsonwebtoken';
import { logger} from '../../core/logging/logger';



export class TokenService {
  private Secret: string;

  constructor(secret: string) {
    this.Secret = secret;
  }

  /**
   *  ExpiresIn: seconds
   * @param data 
   * @param expiresIn 
   * @returns 
   */
  sign(data: string | object, expiresIn : string | number | undefined): string {
    return JWT.sign(data, this.Secret, { expiresIn: expiresIn });
  }

  verify(token: string) : false | JwtPayload | string{
    try{
      return JWT.verify(token, this.Secret);
    }

    catch(error){
        logger.error("Error JWT Verification", error);
        return false
    }
  }
}
