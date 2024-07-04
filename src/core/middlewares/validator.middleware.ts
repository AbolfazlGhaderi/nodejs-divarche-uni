import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { BadRequestError } from "../app/app.errors";
import { injectable } from "inversify";
import { ValidationErrorMessageEnum } from "../../common/enums/message.enum";

@injectable()
export class ValidationMiddleware {
  static validateInput(DTO: ClassConstructor<any>, redirectPath: string , message?:string): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const body = req.body;

        const validationClass = plainToInstance(DTO, body);

        // Validate DTO object
        const errors: ValidationError[] = await validate(validationClass, {});

        if (errors.length > 0) {
          const errorMsg = errors.map((error) => Object.values(error.constraints!)).flat();

          // throw new BadRequestError("bad Request", errorMsg);
          req.flash('ValidationError', message ?? ValidationErrorMessageEnum.ValidationError);
          res.redirect(redirectPath)
        } else {
          next();
        }
      } catch (error) {
        // res.render(`./${viewError}`, {
        //   pageTitle: pageTitle,
        //   ErrvalidationError: "لطفا در وارد کردن اطلاعات دقت نمایید ",
        // });
        // res.cookie('ValidationError', 'لطفا در وارد کردن اطلاعات دقت نمایید ', { maxAge: 2000});
        req.flash('ValidationError', message ?? ValidationErrorMessageEnum.ValidationError);
        res.redirect(redirectPath)

      }
    };
  }
}
