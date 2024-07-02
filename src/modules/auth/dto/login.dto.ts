import { IsMobilePhone, IsNotEmpty, IsNumberString, Length, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsNumberString()
    @IsMobilePhone('fa-IR')
    phoneNumber:string

    @IsNotEmpty()
    @IsString()
    checkAccept:string
}


export class LoginCheckOtpDto {
  @IsNumberString()
  @Length(5, 5)
  otpCode: string;
}
