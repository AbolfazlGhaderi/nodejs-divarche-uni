import { inject } from 'inversify';
import express, { Request } from 'express';
import { LoginCheckOtpDto, LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { IOCTYPES } from '../../iOC/ioc.types';
import { ValidationMiddleware } from '../../core/middlewares/validator.middleware';
import { BaseHttpController, controller, httpGet, httpPost, request, requestBody, response } from 'inversify-express-utils';

@controller('/auth')
export class AuthController extends BaseHttpController {
  @inject(IOCTYPES.AuthService) private authService: AuthService;

  // Login ==>
  @httpGet('/login')
  async GetLogin(@request() req: Request, @response() res: express.Response) {

    return res.render('./login', {
      pageTitle: 'Login - DivarChe',
      validationError: req.flash('ValidationError'),
      otpError: req.flash('otpError'),
    });
  }

  @httpPost('/login', ValidationMiddleware.validateInput(LoginDto, '/auth/login'))
  async LoginPost(@request() req: express.Request, @requestBody() loginDto: LoginDto, @response() res: express.Response) {
    return await this.authService.LoginPost(loginDto, req, res);
  }

  // <=== Login

  // Check Otp ===> 


  @httpPost('/check-otp', ValidationMiddleware.validateInput(LoginCheckOtpDto, '/auth/login')) 
  async LoginCheckOtp(@request() req: express.Request, @requestBody() loginCheckOtpDto: LoginCheckOtpDto, @response() res: express.Response) {
    return await this.authService.LoginCheckOtp(loginCheckOtpDto,req,res)
  }


  // <=== Check Otp
}
