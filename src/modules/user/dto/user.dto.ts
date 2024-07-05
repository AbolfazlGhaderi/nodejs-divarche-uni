import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  address: string;
}

export class AddUserCityDto{
  @IsString()
  @IsNotEmpty()
  city:string

}
