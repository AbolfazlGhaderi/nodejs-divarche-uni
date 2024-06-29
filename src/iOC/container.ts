import { AsyncContainerModule } from "inversify";
import { IUserService } from "../modules/user/interface/user.service.interface";
import { IOCTYPES } from "./ioc.types";
import { UserService } from "../modules/user/user.service";
import {UserRepository,createUserRepository} from "../modules/user/user.repository";


const bindings = new AsyncContainerModule(async (bind) => {
  // bind(IOCTYPES.DataSource).toDynamicValue(createDataSource);

  //repositories
  bind<UserRepository>(IOCTYPES.UserRepository).toDynamicValue(createUserRepository);


  //services
  bind<IUserService>(IOCTYPES.UserService).to(UserService);

});

export { bindings };

