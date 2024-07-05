import express from 'express';
import { inject, injectable } from 'inversify';

import { CreateAdDto } from './dto/ad.dto';
import { IOCTYPES } from '../../iOC/ioc.types';
import { AdRepository } from './ad.repository';
import { cityRepository } from './city.repository';
import { ImageRepository } from './image.repository';
import { UserEntity } from '../../models/user.entity';
import { ImageEntity } from '../../models/image.entity';
import { FileChecker } from '../../core/utils/file.utils';
import { S3Service } from '../../shared/services/s3.service';
import { IAdService } from './interface/ad.service.interface';
import { CheckEnvVariables, GenerateImageName } from '../../core/utils/functions.utils';

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

  async CreateAd(CreateAdData: CreateAdDto, req: express.Request, res: express.Response) {
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
    req.flash('result', 'آگهی شما با موفقیت ثبت شد');
    return res.redirect('/myads');
  }

  async MyAds(req: express.Request, res: express.Response) {
    const user = req.userSession?.user as UserEntity;
    const ads = await this.adRepository.find({ where: { user:{id:user.id} } });
    return res.render('./user-dashboard/ads', {
      pageTitle: 'My Ads - DivarChe',
      ads,
      userData: user,
      error: req.flash('error'),
      result: req.flash('result'),
    });
  }
}
