import express from 'express';
import { inject } from 'inversify';
import { UserService } from './user.service';
import { IOCTYPES } from '../../iOC/ioc.types';
import { AddUserCityDto, UpdateUserDto } from './dto/user.dto';
import { Guard } from '../../core/guards/auth.guard';
import { ValidationMiddleware } from '../../core/middlewares/validator.middleware';
import { BaseHttpController, controller, httpGet, httpPost, request, requestBody, response } from 'inversify-express-utils';

@controller('', Guard.AuthGuard())
export class UserController extends BaseHttpController {
  @inject(IOCTYPES.UserService) private userService: UserService;

  @httpGet('/dashboard')
  async GetDashboard(@request() req: express.Request, @response() res: express.Response) {
    return await this.userService.GetDashboard(req, res);
  }

  @httpGet('/add-city')
  async GetAddUserCity(@request() req: express.Request, @response() res: express.Response) {
    return await this.userService.GetAddUserCity(req, res);
  }

  @httpPost('/add-city')
  async PostAddUserCity(@request() req: express.Request, @response() res: express.Response, @requestBody() addUserCityDto: AddUserCityDto) {
    return await this.userService.PostAddUserCity(req, res,addUserCityDto);
  }

  @httpPost('/user', ValidationMiddleware.validateInput(UpdateUserDto, '/dashboard'))
  async UpdateUser(@requestBody() updaetDto: UpdateUserDto, @request() req: express.Request, @response() res: express.Response) {
    return await this.userService.UpdateUser(req, res, updaetDto);
  }

  @httpGet('/aboutus') //TODO: Should create Global Service and controller
  async GetAboutUs(@request() req: express.Request, @response() res: express.Response) {
    return await this.userService.GetAboutUs(req, res);
  }

  @httpGet('/contact') //TODO: Should create Global Service and controller
  async GetContact(@request() req: express.Request, @response() res: express.Response) {
    return await this.userService.GetContact(req, res);
  }
}
