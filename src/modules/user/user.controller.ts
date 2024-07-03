import express from 'express';
import { inject } from 'inversify';
import { UserService } from './user.service';
import { IOCTYPES } from '../../iOC/ioc.types';
import { Guard } from '../../core/guards/auth.guard';
import { BaseHttpController, controller, httpGet, request, response } from 'inversify-express-utils';

@controller('', Guard.AuthGuard())
export class UserController extends BaseHttpController {
  @inject(IOCTYPES.UserService) private userService: UserService;

  @httpGet('/dashboard')
  async testView(@request() req:express.Request,@response() res: express.Response) {
    // console.log(req.userSession);
    res.render('./user-dashboard/Dashboard', {
      pageTitle: 'Dashboard - DivarChe',
    });
  }

  // @httpGet("/")
  // async getUsers(@request() req:express.Request ,@response() res: express.Response) {

  //   console.log(req.cookies);
  //    const users =  await this.userService.getUsers(req)

  // }
}
