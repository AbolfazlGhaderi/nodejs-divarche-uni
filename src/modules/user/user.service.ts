import { inject, injectable } from "inversify";
import { IOCTYPES } from "../../iOC/ioc.types";
import { UserRepository } from "./user.repository";
import { IUserService } from "./interface/user.service.interface";
import express from "express";

@injectable()
export class UserService implements IUserService {
  @inject(IOCTYPES.UserRepository) private userRepository: UserRepository;

  async getUsers(req: express.Request): Promise<any> {
    
    const user = await this.userRepository.find();

    return user;
  }
}
