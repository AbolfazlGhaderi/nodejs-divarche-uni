import JWT, { JwtPayload } from 'jsonwebtoken';
import { logger} from '../../core/logging/logger';



export class TokenService {
  private Secret: string;

  constructor(secret: string) {
    this.Secret = secret;
  }

  sign(data: string): string {
    return JWT.sign({ sub: data }, this.Secret, { expiresIn: '2m' });
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
