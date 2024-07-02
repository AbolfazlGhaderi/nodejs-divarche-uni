import express from "express";
import { inject, injectable } from "inversify";
import { IOCTYPES } from "../../iOC/ioc.types";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";
import { SessionRepository } from "./session.repository";
import { IAuthService } from "./interface/auth.service.interface";
import { CookieService } from "../../shared/services/cookie.service";
import { CheckEnvVariables } from "../../core/utils/functions.utils";
import { OtpService } from "../../shared/services/otp.service";
import { LoginDto } from "./dto/login.dto";
import { TokenService } from "../../shared/services/token.service";

@injectable()
export class AuthService implements IAuthService {
  private cokieService : CookieService = new CookieService(CheckEnvVariables(process.env.COOKIE_SECRET,'Cookie Secret'));
  private tokenService:TokenService = new TokenService(CheckEnvVariables(process.env.JWT_SECRET,'JWT Secret'));
  @inject(IOCTYPES.UserService) private userService:UserService ;
  @inject(IOCTYPES.UserRepository) private userRepository:UserRepository;
  @inject(IOCTYPES.SessionRepository) private sessionRepository:SessionRepository;
  private otpService: OtpService = new OtpService()

  async LoginPost(loginData : LoginDto, req:express.Request, res:express.Response) {

    const {checkAccept,phoneNumber} = loginData


    
  //  return res.render('./check-otp', { pageTitle: 'otp - DivarChe'})

  }
}
