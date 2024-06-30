import { BaseHttpController, controller, httpGet, response } from "inversify-express-utils";
import express from "express";
import { inject } from "inversify";
import { IOCTYPES } from "../../iOC/ioc.types";
import { AdService } from "./ad.service";

@controller("/ad")
export class AdController extends BaseHttpController {

  @inject(IOCTYPES.AdService) private adService:AdService



  @httpGet("/")
  async testView(@response() res: express.Response) {
    console.log();
    return  await this.adService.cetCity()
  }

}
