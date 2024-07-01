import express from "express";
import { inject, injectable } from "inversify";
import { IOCTYPES } from "../../iOC/ioc.types";
import { IAuthService } from "./interface/auth.service.interface";
import { CookieService } from "../cookie/cookie.service";
import { CheckEnvVariables } from "../../core/utils/functions.utils";

@injectable()
export class AuthService implements IAuthService {
  private cokieService : CookieService = new CookieService(CheckEnvVariables(process.env.COOKIE_SECRET,'Cookie Secret'));


  // @inject(IOCTYPES.UserRepository) private userRepository: UserRepository;


  // async Login
}
