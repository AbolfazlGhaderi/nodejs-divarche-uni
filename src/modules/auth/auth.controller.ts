import { inject } from "inversify";
import express,{Request} from "express";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { IOCTYPES } from "../../iOC/ioc.types";
import { ValidationMiddleware } from "../../core/middlewares/validator.middleware";
import { BaseHttpController, controller, httpGet, httpPost, request, requestBody, response } from "inversify-express-utils";

@controller("/auth")
export class AuthController extends BaseHttpController {
 @inject(IOCTYPES.AuthService) private authService:AuthService

  @httpGet("/login")
  async GetLogin(@request() req:Request,@response() res: express.Response) {
      
    res.render('./login',{
      pageTitle:'Login - DivarChe',
      validationError:req.flash('ValidationError')
    })

  }

  @httpPost('/login',ValidationMiddleware.validateInput(LoginDto ,'/auth/login' ))
  async PostLogin(@request() request:express.Request,@requestBody() body:LoginDto ,@response() res: express.Response) {
    console.log(body);

    console.log("object");
   
    res.send(body)

    
  }

  // @httpGet("/otp")
  // test2(@response() res: express.Response) {
  //   res.render('./check-otp',{
  //     pageTitle:'checkOtp - DivarChe',
  //   })
  // }
}
