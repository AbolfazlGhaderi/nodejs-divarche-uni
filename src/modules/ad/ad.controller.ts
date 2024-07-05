import { BaseHttpController, controller, httpGet, httpPost, request, requestBody, response } from 'inversify-express-utils';
import express from 'express';
import { inject } from 'inversify';
import { IOCTYPES } from '../../iOC/ioc.types';
import { AdService } from './ad.service';
import { Guard } from '../../core/guards/auth.guard';
import { CreateAdDto } from './dto/ad.dto';
import { UserEntity } from '../../models/user.entity';
import multer from 'multer';
import upload from '../../core/configs/multer.config';
import { ValidationMiddleware } from '../../core/middlewares/validator.middleware';

@controller('/ad')
export class AdController extends BaseHttpController {
  @inject(IOCTYPES.AdService) private adService: AdService;

  @httpGet('/', Guard.AuthGuard())
  async GetCreateAd(@request() req: express.Request, @response() res: express.Response) {
    return await this.adService.GetCreateAd(req, res);
  }

  @httpPost('/', Guard.AuthGuard(), upload.single('image'), ValidationMiddleware.validateInput(CreateAdDto, '/ad'))
  async CreateAd(@request() req: express.Request, @requestBody() createAdDto: CreateAdDto, @response() res: express.Response) {
    return await this.adService.CreateAd(createAdDto, req, res);
  }
}
