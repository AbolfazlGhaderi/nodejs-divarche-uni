import { id, inject, injectable } from "inversify";
import { IOCTYPES } from "../../iOC/ioc.types";
import { IAdService } from "./interface/ad.service.interface";
import { cityRepository } from "./city.repository";

import express from 'express'
import { CreateAdDto } from "./dto/ad.dto";
@injectable()
export class AdService implements IAdService {
  @inject(IOCTYPES.CityRepository) private cityRepository: cityRepository;

  async CreateAd(CreateAdData: CreateAdDto, req: express.Request, res: express.Response) {

    return "ok"
  }



}
