import { HttpStatus } from "../enums/httpStatus.enum";
import { IErrorResponse, ISuccessResponse } from "../interfaces/IAppResponse";

export class ResponseFactory {
  public static successResponse(status: HttpStatus, data: any): ISuccessResponse {
    return {
      status,
      success: true,
      results: {
        ...data,
      },
    };
  }
  public static errorResponse(status: HttpStatus, message: any, details: string[] = []): IErrorResponse {
    return {
      status,
      success: false,
      error: {
        message,
        details,
      },
    };
  }
}
