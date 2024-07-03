import { Repository } from "typeorm";
import { AdEntity } from "../../models/ad.entity";
import { appDataSrc } from '../../core/app/app.dataSource';


class AdRepository extends Repository<AdEntity> {
  constructor() {
    super(AdEntity,appDataSrc.manager);
  }
}

function createAdRepository(): AdRepository {
  return new AdRepository();
}

export { AdRepository, createAdRepository };
