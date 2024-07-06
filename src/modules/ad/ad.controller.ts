import express from 'express';
import { inject } from 'inversify';
import { AdService } from './ad.service';
import { IOCTYPES } from '../../iOC/ioc.types';
import { Guard } from '../../core/guards/auth.guard';
import upload from '../../core/configs/multer.config';
import { CreateAdDto, DeleteAdDto } from './dto/ad.dto';
import { ValidationMiddleware } from '../../core/middlewares/validator.middleware';
import { BaseHttpController, controller, httpGet, httpPost, request, requestBody, requestParam, response } from 'inversify-express-utils';

@controller('')
export class AdController extends BaseHttpController {
  @inject(IOCTYPES.AdService) private adService: AdService;

  @httpGet('/ad', Guard.AuthGuard())
  async GetCreateAd(@request() req: express.Request, @response() res: express.Response) {
    return await this.adService.GetCreateAd(req, res);
  }

  @httpPost('/ad', Guard.AuthGuard(), upload.single('image'), ValidationMiddleware.validateInput(CreateAdDto, '/ad'))
  async CreateAd(@request() req: express.Request, @requestBody() createAdDto: CreateAdDto, @response() res: express.Response) {
    return await this.adService.CreateAd(req, res, createAdDto);
  }

  @httpGet('/myads', Guard.AuthGuard())
  async MyAds(@request() req: express.Request, @response() res: express.Response) {
    return await this.adService.MyAds(req, res);
  }

  @httpPost('/del-ad', Guard.AuthGuard(), ValidationMiddleware.validateInput(DeleteAdDto, '/myads', 'با داده ها بازی نکن !'))
  async DeleteAd(@request() req: express.Request, @requestBody() deleteAdDto: DeleteAdDto, @response() res: express.Response) {
    return await this.adService.DeleteAd(req, res, deleteAdDto);
  }

  @httpGet('/edit-ad/:id', Guard.AuthGuard())
  async GetEditAd(@request() req: express.Request, @requestParam('id') adId: string, @response() res: express.Response) {
    return await this.adService.GetEditAd(req, res, adId);
  }
}
