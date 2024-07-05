import express from 'express';
import { inject, injectable } from 'inversify';
import { IOCTYPES } from '../../iOC/ioc.types';
import { UserRepository } from './user.repository';
import { UserEntity } from '../../models/user.entity';
import { IUserService } from './interface/user.service.interface';
import { AdRepository } from '../ad/ad.repository';
import { AddUserCityDto, UpdateUserDto } from './dto/user.dto';
import { cityRepository } from '../ad/city.repository';

//  types And Interface
type TCreateUser = {
  name: string;
  phone: string;
};
//

@injectable()
export class UserService implements IUserService {
  @inject(IOCTYPES.UserRepository) private userRepository: UserRepository;
  @inject(IOCTYPES.AdRepository) private adRepository: AdRepository;
  @inject(IOCTYPES.CityRepository) private cityRepository: cityRepository;

  async GetDashboard(req: express.Request, res: express.Response) {
    if (!req.userSession || !req.userSession.user) {
      res.redirect('/auth/login');
    }
    const user = req.userSession?.user as UserEntity;

    const countAd = await this.adRepository.count({ where: { user: user } });
    user.phone = user.phone.replace('+98', '0');

    return res.render('./user-dashboard/Dashboard', {
      pageTitle: 'Dashboard - DivarChe',
      userData: user,
      countAd,
      validationError: req.flash('ValidationError'),
    });
  }

  async GetAddUserCity(req: express.Request, res: express.Response) {
    const cities = await this.cityRepository.find();
    return res.render('./city', { pageTitle: 'Add City - DivarChe', error: req.flash('error'), cities });
  }

  async PostAddUserCity(req: express.Request, res: express.Response, addUserCityDto: AddUserCityDto) {
    const city = await this.cityRepository.findOne({ where: { name: addUserCityDto.city } });
    
    if(!city){
      req.flash('error', 'شهر مورد نظر یافت نشد');
      return  res.redirect('/add-city')
    }

    const user = req.userSession?.user as UserEntity;

    user.city = city
    await this.userRepository.save(user)

    return res.redirect('/dashboard');
  }

  async UpdateUser(req: express.Request, res: express.Response, userData: UpdateUserDto) {
    console.log(userData);
    const user = req.userSession?.user as UserEntity;
    user.name = userData.name === '' ? user.name : userData.name;
    user.address = userData.address === '' ? user.address : userData.address;
    await this.userRepository.save(user);
    return res.redirect('/dashboard');
  }
}
