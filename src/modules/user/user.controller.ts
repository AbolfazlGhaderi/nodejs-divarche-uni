import { BaseHttpController, controller, httpGet, httpPost, requestBody, response } from "inversify-express-utils";
import express from "express";


@controller("/user")
export class UserController extends BaseHttpController {
 
    @httpGet('/')
    async getUsers( @response() res: express.Response){
        console.log();
        res.render('404')    
    }
}

