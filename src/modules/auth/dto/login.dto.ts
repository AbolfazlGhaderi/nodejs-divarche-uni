import { IsMobilePhone, IsNotEmpty, IsNumberString, IsPhoneNumber, IsString } from "class-validator";

export class LoginDto{
    @IsNotEmpty()
    @IsNumberString()
    @IsMobilePhone('fa-IR')
    phoneNumber:string

    @IsNotEmpty()
    @IsString()
    checkAccept:string
}