import { inject, injectable } from "inversify";
import { IUserService } from "./interface/user.service.interface";
import { IOCTYPES } from "../../iOC/ioc.types";



@injectable()
export class UserService implements IUserService {
}
