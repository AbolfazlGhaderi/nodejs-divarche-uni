export enum OtpErrorMessageEnum {
  DuplicatedOtp = 'کد تایید برای شما ارسال شده است  ، کد را وارد کنید یا 2 دقیقه بعد مجددا امتحان نمایید .',
  InvalidOtp = 'کد تایید اشتباه است .',
  ExpiredOtp = 'کد تایید منقضی شده است ، لطفا مجددا امتحان نمایید.',
  ErrorInTransaction = 'خطایی به وجود آمده است ، لطفا مجددا تلاش نمایید . ',
}

export enum ValidationErrorMessageEnum {
  ValidationError = 'لطفا در وارد کردن اطلاعات دقت نمایید.',
}

export enum PublicMessageEnum {
  AdDeleteSuccess = 'آگهی با موفقیت حذف شد',
  AdCreateSuccess = 'آگهی با موفقیت ایجاد شد',
  AdDeleteError = 'آگهی موجود نمیباشد ', // TODO:
}
