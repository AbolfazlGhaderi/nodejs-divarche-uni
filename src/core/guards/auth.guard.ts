import { NextFunction, Response, Request } from 'express';
import { CheckEnvVariables } from '../utils/functions.utils';
import { CookieService } from '../../shared/services/cookie.service';
import { CookieNameEnum } from '../../common/enums/cookie.name.enum';
import { createUserRepository, UserRepository } from '../../modules/user/user.repository';
import { createSessionRepository, SessionRepository } from '../../modules/auth/session.repository';

class Guard {
  private static instance: Guard;

  private sessionRepository: SessionRepository = createSessionRepository();
  private userRepository: UserRepository = createUserRepository();
  private cookieService: CookieService = new CookieService(CheckEnvVariables(process.env.COOKIE_SECRET, 'COOKIE SECRET'));

  static get(): Guard {
    if (!Guard.instance) {
      Guard.instance = new Guard();
    }
    return Guard.instance;
  }

  AuthGuard() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const cookie = req.cookies[CookieNameEnum.Session];

      if (!cookie) {
        return res.redirect('/auth/login');
      }
      
      const cookieVerified = this.cookieService.verify(cookie);
      if (cookieVerified.status === false) {
        res.clearCookie(CookieNameEnum.Session);
        return res.redirect('/auth/login');
      }

      const session = await this.sessionRepository.findOne({
        where: { value: cookieVerified.hash, is_valid: true },
        relations: { user: true },
      });

      if (!session) {
        res.clearCookie(CookieNameEnum.Session);
        return res.redirect('/auth/login');
      }

      if(this.cookieService.checkExpireCookie(+session.expire_at)){
        await this.cookieService.ExpiringSession(session)
        res.clearCookie(CookieNameEnum.Session);
        return res.redirect('/auth/login');
      }

      req.userSession = session;

      // Check City
      if(!session.user.city){
        if(req.url === '/add-city' ) {
          return next()
        }
        return res.redirect('/add-city')
      }

      next();
    };
  }

  CheckCookie() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const cookie = req.cookies[CookieNameEnum.Session];
      if(cookie) {
        return res.redirect('/dashboard')

      }
      
     
      next();
    };
  }



}

const instance = Guard.get();

export { instance as Guard };
