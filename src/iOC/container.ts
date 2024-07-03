import { AsyncContainerModule } from 'inversify';
import { IUserService } from '../modules/user/interface/user.service.interface';
import { IOCTYPES } from './ioc.types';
import { UserService } from '../modules/user/user.service';
import { UserRepository, createUserRepository } from '../modules/user/user.repository';
import { cityRepository, createCityRepository } from '../modules/ad/city.repository';
import { IAdService } from '../modules/ad/interface/ad.service.interface';
import { AdService } from '../modules/ad/ad.service';
import { AuthService } from '../modules/auth/auth.service';
import { IAuthService } from '../modules/auth/interface/auth.service.interface';
import { createSessionRepository, SessionRepository } from '../modules/auth/session.repository';
import { AdRepository, createAdRepository } from '../modules/ad/ad.repository';

const bindings = new AsyncContainerModule(async (bind) => {
  // bind(IOCTYPES.DataSource).toDynamicValue(createDataSource);

  //repositories
  bind<UserRepository>(IOCTYPES.UserRepository).toDynamicValue(createUserRepository);
  bind<cityRepository>(IOCTYPES.CityRepository).toDynamicValue(createCityRepository);
  bind<SessionRepository>(IOCTYPES.SessionRepository).toDynamicValue(createSessionRepository);
  bind<AdRepository>(IOCTYPES.AdRepository).toDynamicValue(createAdRepository);

  //services
  bind<IUserService>(IOCTYPES.UserService).to(UserService);
  bind<IAdService>(IOCTYPES.AdService).to(AdService);
  bind<IAuthService>(IOCTYPES.AuthService).to(AuthService);
});

export { bindings };
