import { id, inject, injectable } from "inversify";
import { IOCTYPES } from "../../iOC/ioc.types";
import { IAdService } from "./interface/ad.service.interface";
import { cityRepository } from "./city.repository";

@injectable()
export class AdService implements IAdService {
  @inject(IOCTYPES.CityRepository) private cityRepository: cityRepository;

  async cetCity() {

    return "ok"
  }



}
