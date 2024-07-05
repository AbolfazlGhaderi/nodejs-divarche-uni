import { Repository } from "typeorm";
import { ImageEntity } from "../../models/image.entity";
import { appDataSrc } from '../../core/app/app.dataSource';


class ImageRepository extends Repository<ImageEntity> {
  constructor() {
    super(ImageEntity,appDataSrc.manager);
  }
}

function createImageRepository(): ImageRepository {
  return new ImageRepository();
}

export { ImageRepository, createImageRepository };
