import { AsyncContainerModule } from "inversify";
import { IUserService } from "../modules/user/interface/user.service.interface";
import { IOCTYPES } from "./ioc.types";
import { UserService } from "../modules/user/user.service";

const bindings = new AsyncContainerModule(async (bind) => {
  // bind(IOCTYPES.DataSource).toDynamicValue(createDataSource);

  // rpositories


  //services
  bind<IUserService>(IOCTYPES.UserService).to(UserService);

});

export { bindings };