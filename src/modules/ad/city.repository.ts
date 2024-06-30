import { Repository } from "typeorm";
import { CityEntity } from "../../models/city.model";
import { appDataSrc } from '../../core/app/app.dataSource';


class cityRepository extends Repository<CityEntity> {
  constructor() {
    super(CityEntity,appDataSrc.manager);
  }
}

function createCityRepository(): cityRepository {
  return new cityRepository();
}

export { cityRepository, createCityRepository };
