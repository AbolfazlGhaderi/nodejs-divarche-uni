import express from 'express';
import { DataSource } from 'typeorm';
import { JwtPayload } from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import { IOCTYPES } from '../../iOC/ioc.types';
import { logger } from '../../core/logging/logger';
import { UserService } from '../user/user.service';
import { UserEntity } from '../../models/user.entity';
import { UserRepository } from '../user/user.repository';
import { SessionRepository } from './session.repository';
import { appDataSrc } from '../../core/app/app.dataSource';
import { SessionEntity } from '../../models/session.entity';
import { LoginCheckOtpDto, LoginDto } from './dto/login.dto';
import { OtpService } from '../../shared/services/otp.service';
import { IAuthService } from './interface/auth.service.interface';
import { TokenService } from '../../shared/services/token.service';
import { CheckEnvVariables, GenerateRandomByte } from '../../core/utils/functions.utils';
import { CookieNameEnum } from '../../common/enums/cookie.name.enum';
import { CookieService, IN_PRODUCTION } from '../../shared/services/cookie.service';

import { OtpErrorMessageEnum, ValidationErrorMessageEnum } from '../../common/enums/message.enum';

@injectable()
export class AuthService implements IAuthService {
  private cokieService: CookieService = new CookieService(CheckEnvVariables(process.env.COOKIE_SECRET, 'Cookie Secret'));
  private tokenService: TokenService = new TokenService(CheckEnvVariables(process.env.JWT_SECRET, 'JWT Secret'));
  private otpService: OtpService = new OtpService();
  private dataSource: DataSource = appDataSrc;

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

  async LoginCheckOtp(loginCheckOtpData: LoginCheckOtpDto, req: express.Request, res: express.Response) {
    const { otpCode } = loginCheckOtpData;

    // Get Cookie And Verify Token
    const otpTokenCookie = req.cookies[CookieNameEnum.OtpToken];
    const otpTokenPayload = this.tokenService.verify(otpTokenCookie);

    if (otpTokenPayload === false || !otpTokenCookie) {
      req.flash('otpError', OtpErrorMessageEnum.ExpiredOtp);
      return res.redirect('/auth/login');
    }

    const { phoneNumber } = otpTokenPayload as JwtPayload;
    let key = `${phoneNumber}:login`;

    // Get Code From Cache
    const otpInCach = await this.otpService.GetOtp(key);

    // Check Code
    if (!otpInCach) {
      req.flash('otpError', OtpErrorMessageEnum.ExpiredOtp);
      return res.redirect('/auth/login');
    }

    // check code is valid or not
    if (otpInCach !== otpCode) {
      return res.render('./check-otp', {
        pageTitle: 'otp - DivarChe',
        otpCode: otpInCach,
        otpError: OtpErrorMessageEnum.InvalidOtp,
      });
    }

    // Remove code from Cach
    await this.otpService.DelOtp(key);

    //  Create Session/Cookie
    const { hash, signature, value } = this.cokieService.sign(`${phoneNumber}-${GenerateRandomByte(10)}`);
    const expire_at = (Date.now() + 1000 * 60 * 60 * 72).toString(); // 72 hours

    // find User
    let user = await this.userRepository.findUserByPhone(phoneNumber);

    // Start Transactions
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const sessionRepository = queryRunner.manager.getRepository(SessionEntity);
      const userRepository = queryRunner.manager.getRepository(UserEntity);

      // Register User
      if (!user) {
        user = await userRepository.save({ name: `U-${phoneNumber.replace('+98','0')}`, phone: phoneNumber });
      }

      // Save Session Data
      await sessionRepository.save({ value: hash, expire_at: expire_at, user: user });
      // const x:boolean = true
      // if(x){
      //   throw new TypeError("A runtime error occurred in the middle of the transaction");
      // }

      await queryRunner.commitTransaction();

      // Set Cookie
      res.cookie(CookieNameEnum.Session, value, {
        maxAge: 1000 * 60 * 60 * 72, // 72 hours
        secure: IN_PRODUCTION,
        httpOnly: true,
        sameSite: 'lax',
      });

      return res.redirect('/dashboard');
      
    } catch (error) {

      logger.error('Error in Transaction LoginCheckOtp', error);
      await queryRunner.rollbackTransaction();
      req.flash('otpError', OtpErrorMessageEnum.ErrorInTransaction);
      return res.redirect('/auth/login');

    } finally {

      await queryRunner.release();

    }

    // return loginCheckOtpData;
  }
}
