import { inject, injectable } from "inversify";
import { IOCTYPES } from "../../iOC/ioc.types";
import { UserRepository } from "./user.repository";
import { UserEntity } from "../../models/user.model";
import { IUserService } from "./interface/user.service.interface";
import { NotFoundError } from "../../core/app/app.errors";

@injectable()
export class UserService implements IUserService {
  @inject(IOCTYPES.UserRepository) private userRepository: UserRepository;

  async getUsers(): Promise<UserEntity[]> {
    const user = await this.userRepository.find();
    
    return user
  }
}
