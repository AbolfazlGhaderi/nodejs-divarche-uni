import express from 'express';
import { inject, injectable } from 'inversify';

import { IOCTYPES } from '../../iOC/ioc.types';
import { AdRepository } from './ad.repository';
import { cityRepository } from './city.repository';
import { ImageRepository } from './image.repository';
import { UserEntity } from '../../models/user.entity';
import { ImageEntity } from '../../models/image.entity';
import { FileChecker } from '../../core/utils/file.utils';
import { S3Service } from '../../shared/services/s3.service';
import { IAdService } from './interface/ad.service.interface';
import { CreateAdDto, DeleteAdDto, UpdateAdDto } from './dto/ad.dto';
import { CheckEnvVariables, GenerateImageName } from '../../core/utils/functions.utils';
import { NotFoundErrorMessageEnum, PublicMessageEnum } from '../../common/enums/message.enum';

@injectable()
export class AdService implements IAdService {
  private s3Service: S3Service = new S3Service(
    CheckEnvVariables(process.env.S3_ENDPOINT, 'S3 Endpoint'),
    CheckEnvVariables(process.env.S3_ACCESS_KEY_ID, 'S3 Access Key ID'),
    CheckEnvVariables(process.env.S3_SECRET_KEY, 'S3 Secret Key'),
  );
  @inject(IOCTYPES.AdRepository) private adRepository: AdRepository;
  @inject(IOCTYPES.CityRepository) private cityRepository: cityRepository;
  @inject(IOCTYPES.ImageRepository) private imageRepository: ImageRepository;

  async GetCreateAd(req: express.Request, res: express.Response) {
    const user = req.userSession?.user as UserEntity;
    return res.render('./user-dashboard/add-ad', {
      pageTitle: 'Add Ad - DivarChe',
      userData: user,
      validationError: req.flash('ValidationError'),
      Error: req.flash('Error'),
    });
  }

  async CreateAd(req: express.Request, res: express.Response, CreateAdData: CreateAdDto) {
    const file = req.file;
    const user = req.userSession?.user as UserEntity;
    let image: undefined | ImageEntity;

    // Check Image File
    if (file) {
      const validationFormat = FileChecker.CheckImageFormat(file);
      if (validationFormat.status === false) {
        req.flash('ValidationError', validationFormat.message);
        return res.redirect('/ad');
      }

      // Generate Name File
      file.originalname = GenerateImageName(file.originalname);

      // Upload File
      const uploadFile = await this.s3Service.UploadFile(file, CheckEnvVariables(process.env.S3_BUCKET, 'S3 Bucket'));
      if (uploadFile.status === false) {
        req.flash('Error', uploadFile.message);
        return res.redirect('/ad');
      }

      image = await this.imageRepository.save({
        name: file.originalname,
        location: uploadFile.fileAddress,
        section: 'ad',
        user: user,
      });
    }

    const { brand, color, description, engine_check, gearbox_check, operation, p_year, price, title } = CreateAdData;
    const ad = this.adRepository.create({
      brand,
      color: color,
      description: description,
      engine_check: engine_check,
      gearbox_check: gearbox_check,
      operation: operation,
      p_year,
      price: price.replaceAll(',', ''),
      image: image ? image : undefined,
      title,
      user: user,
      city: user.city,
    });

    await this.adRepository.save(ad);
    req.flash('result', PublicMessageEnum.AdCreateSuccess);
    return res.redirect('/myads');
  }

  async MyAds(req: express.Request, res: express.Response) {
    const user = req.userSession?.user as UserEntity;
    const ads = await this.adRepository.find({ where: { user: { id: user.id } }, order: { create_atr: 'ASC' } });
    return res.render('./user-dashboard/ads', {
      pageTitle: 'My Ads - DivarChe',
      ads,
      userData: user,
      validationError: req.flash('ValidationError'),
      error: req.flash('error'),
      result: req.flash('result'),
    });
  }

  async DeleteAd(req: express.Request, res: express.Response, deleteAdData: DeleteAdDto) {
    const result = await this.adRepository.delete({ id: deleteAdData.id });
    if (result.affected === 0) {
      req.flash('error', NotFoundErrorMessageEnum.AdNotFound);
      return res.redirect('/myads');
    }
    req.flash('result', PublicMessageEnum.AdDeleteSuccess);
    return res.redirect('/myads');
  }

  async GetUpdaetAd(req: express.Request, res: express.Response, adId: string) {
    const user = req.userSession?.user as UserEntity;
    const ad = await this.adRepository.findOne({ where: { id: adId, user: { id: user.id } }, relations: { image: true } });
    return res.render('./user-dashboard/edit-ad', {
      pageTitle: 'Edit Ad - DivarChe',
      ad,
      userData: user,
      error: req.flash(`error`),
      validationError: req.flash(`ValidationError`),
    });
  }
  async UpdateAd(req: express.Request, res: express.Response, updateAdData: UpdateAdDto) {
    const user = req.userSession?.user as UserEntity;
    const file = req.file;
    let image: undefined | ImageEntity;

    if (file) {
      const validationFormat = FileChecker.CheckImageFormat(file);
      if (validationFormat.status === false) {
        req.flash('ValidationError', validationFormat.message);
        return res.redirect('/myads'); // TODO: should redirect to edit-ad/:id
      }

      // Generate Name File
      file.originalname = GenerateImageName(file.originalname);

      // Upload File
      const uploadFile = await this.s3Service.UploadFile(file, CheckEnvVariables(process.env.S3_BUCKET, 'S3 Bucket'));
      if (uploadFile.status === false) {
        req.flash('Error', uploadFile.message);
        return res.redirect('/myads'); // TODO: should redirect to edit-ad/:id
      }

      image = await this.imageRepository.save({
        name: file.originalname,
        location: uploadFile.fileAddress,
        section: 'ad',
        user: user,
      });
    }

    const { id, brand, color, description, engine_check, gearbox_check, operation, p_year, price, title } = updateAdData;
    const ad = await this.adRepository.findOne({ where: { id: id, user: { id: user.id } }, relations: { image: true, city: true } });
    if (!ad) {
      req.flash('error', NotFoundErrorMessageEnum.AdNotFound);
      return res.redirect('/myads'); // TODO: should redirect to edit-ad/:id
    }

    // Update ===>
    ad.brand = brand || ad.brand;
    ad.color = color || ad.color;
    ad.description = description || ad.description;
    ad.engine_check = engine_check || 'true';
    ad.gearbox_check = gearbox_check || 'true';
    ad.operation = operation || ad.operation;
    ad.p_year = p_year || ad.p_year;
    ad.price = price.replaceAll(',', '') || ad.price;
    ad.title = title || ad.title;
    ad.image = image ? image : ad.image;
    ad.user = user;
    ad.city = ad.city;
    // <=== ----

    const updateAd = await this.adRepository.save(ad);

    req.flash('result', PublicMessageEnum.AdUpdateSuccess);

    return res.redirect('/myads');
  }

  // async UploadeImageAd(file : Express.Multer.File){  // TODO: Should create Uploade Service

  // }

  async GetAd(req: express.Request, res: express.Response, adId: string) {
    let ad = await this.adRepository.findOne({ where: { id: adId }, relations: { image: true, city: true ,user:true} });
    if(!ad){

      return res.render('./ad', { pageTitle: 'ad - DivarChe', ad:undefined, active: 'example' });
    }
    ad.user.phone = ad.user.phone.replace('+98','0')
    return res.render('./ad', { pageTitle: 'ad - DivarChe', ad, active: 'example' });
  }
}
