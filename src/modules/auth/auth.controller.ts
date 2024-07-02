import express from "express";
import { inject } from "inversify";
import { IOCTYPES } from "../../iOC/ioc.types";
import { BaseHttpController, controller, httpGet, response } from "inversify-express-utils";

@controller("/auth")
export class AuthController extends BaseHttpController {
  // @inject(IOCTYPES.UserService) private userService:UserService ;

  @httpGet("/login")
  test(@response() res: express.Response) {
    res.render('./login',{
      pageTitle:'Login - DivarChe'
    })

  }

  @httpGet("/otp")
  test2(@response() res: express.Response) {
    res.render('./check-otp',{
      pageTitle:'checkOtp - DivarChe',
    })
  }
}
