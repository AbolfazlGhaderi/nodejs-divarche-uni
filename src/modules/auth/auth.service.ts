import express from 'express';
import { inject, injectable } from 'inversify';
import { IOCTYPES } from '../../iOC/ioc.types';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { SessionRepository } from './session.repository';
import { LoginCheckOtpDto, LoginDto } from './dto/login.dto';
import { OtpService } from '../../shared/services/otp.service';
import { IAuthService } from './interface/auth.service.interface';
import { TokenService } from '../../shared/services/token.service';
import { CheckEnvVariables } from '../../core/utils/functions.utils';
import { CookieNameEnum } from '../../common/enums/cookie.name.enum';
import { CookieService, IN_PRODUCTION } from '../../shared/services/cookie.service';

import { OtpErrorMessageEnum, ValidationErrorMessageEnum } from '../../common/enums/message.enum';

@injectable()
export class AuthService implements IAuthService {
  private cokieService: CookieService = new CookieService(CheckEnvVariables(process.env.COOKIE_SECRET, 'Cookie Secret'));
  private tokenService: TokenService = new TokenService(CheckEnvVariables(process.env.JWT_SECRET, 'JWT Secret'));
  private otpService: OtpService = new OtpService();

  @inject(IOCTYPES.UserService) private userService: UserService;
  @inject(IOCTYPES.UserRepository) private userRepository: UserRepository;
  @inject(IOCTYPES.SessionRepository) private sessionRepository: SessionRepository;

  async LoginPost(loginData: LoginDto, req: express.Request, res: express.Response) {
    const { checkAccept, phoneNumber } = loginData;
    if (checkAccept !== 'on') {
      req.flash('ValidationError', ValidationErrorMessageEnum.ValidationError);
      return res.redirect('/auth/login');
    }

    const key = `${phoneNumber}:login`;
    const otp = await this.otpService.GetOtp(key);

    if (otp && req.cookies[CookieNameEnum.OtpToken]) {
      return res.render('./check-otp', {
        pageTitle: 'otp - DivarChe',
        otpCode: otp,
        otpError: OtpErrorMessageEnum.DuplicatedOtp,
      });
    }

    const { code, otpToken } = await this.LoginSaveAndSendOtp(phoneNumber, key, req, res);

    // Set Cookie
    res.cookie(CookieNameEnum.OtpToken, otpToken, {
      maxAge: 1000 * 60 * 2, // 2 minutes
      httpOnly: true,
      secure: IN_PRODUCTION,
      sameSite: 'lax',
    });
    return res.render('./check-otp', { pageTitle: 'otp - DivarChe', otpCode: code, otpError: undefined });
  }

  async LoginSaveAndSendOtp(phoneNumber: string, key: string, req: express.Request, res: express.Response) {
    // Generate Otp
    const code = this.otpService.GenerateOtpCode(5);

    // Send otp
    //
    // Save Otp
    await this.otpService.SetOtp(key, code, 120);

    // Generate Otp Token
    const otpToken = this.tokenService.sign({ phoneNumber }, '2m');

    return { code, otpToken };
  }


}
