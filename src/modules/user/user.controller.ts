import express from "express";
import { inject } from "inversify";
import { UserService } from "./user.service";
import { IOCTYPES } from "../../iOC/ioc.types";
import { BaseHttpController, controller, httpGet, httpPost, request, requestBody, response } from "inversify-express-utils";


@controller("/user")
export class UserController extends BaseHttpController {

  @inject(IOCTYPES.UserService) private userService:UserService ;


  @httpGet("/d")
  async testView(@response() res: express.Response) {
    console.log();
    res.render("404");
  }

  // @httpGet("/")
  // async getUsers(@request() req:express.Request ,@response() res: express.Response) {
    
  //   console.log(req.cookies);
  //    const users =  await this.userService.getUsers(req)



  // }

}
