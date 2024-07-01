import { Repository } from "typeorm";
import { appDataSrc } from '../../core/app/app.dataSource';
import { UserEntity } from '../../models/user.entity';


class UserRepository extends Repository<UserEntity> {
  constructor() {
    super(UserEntity, appDataSrc.manager);
  }
  public async findUserByPhone(phone: string): Promise<UserEntity | null> {
    const user = await this.findOne({ where: { phone: phone } });
    return user;
  }
}

function createUserRepository(): UserRepository {
  return new UserRepository();
}

export { UserRepository, createUserRepository };
