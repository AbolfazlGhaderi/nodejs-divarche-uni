import { AsyncContainerModule } from 'inversify';

import { IOCTYPES } from './ioc.types';
import { AdService } from '../modules/ad/ad.service';
import { AuthService } from '../modules/auth/auth.service';
import { UserService } from '../modules/user/user.service';
import { IAdService } from '../modules/ad/interface/ad.service.interface';
import { AdRepository, createAdRepository } from '../modules/ad/ad.repository';
import { IUserService } from '../modules/user/interface/user.service.interface';
import { IAuthService } from '../modules/auth/interface/auth.service.interface';
import { cityRepository, createCityRepository } from '../modules/ad/city.repository';
import { UserRepository, createUserRepository } from '../modules/user/user.repository';
import { createImageRepository, ImageRepository } from '../modules/ad/image.repository';
import { createSessionRepository, SessionRepository } from '../modules/auth/session.repository';

const bindings = new AsyncContainerModule(async (bind) => {
  // bind(IOCTYPES.DataSource).toDynamicValue(createDataSource);

  //repositories
  bind<AdRepository>(IOCTYPES.AdRepository).toDynamicValue(createAdRepository);
  bind<UserRepository>(IOCTYPES.UserRepository).toDynamicValue(createUserRepository);
  bind<cityRepository>(IOCTYPES.CityRepository).toDynamicValue(createCityRepository);
  bind<ImageRepository>(IOCTYPES.ImageRepository).toDynamicValue(createImageRepository);
  bind<SessionRepository>(IOCTYPES.SessionRepository).toDynamicValue(createSessionRepository);

  //services
  bind<IAdService>(IOCTYPES.AdService).to(AdService);
  bind<IUserService>(IOCTYPES.UserService).to(UserService);
  bind<IAuthService>(IOCTYPES.AuthService).to(AuthService);
});

export { bindings };
