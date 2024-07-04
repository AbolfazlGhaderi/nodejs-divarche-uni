import { IsBoolean, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateAdDto {
  @IsString()
  title: string;
  @IsString()
  brand: string;
  @IsNumberString()
  p_year: string;
  @IsNumberString()
  operation: string;
  @IsString()
  color: string;
  @IsString()
  price: string;
  @IsString()
  description: string;
  @IsBoolean()
  engine_check: boolean;
  @IsBoolean()
  gearbox_check: boolean;
}
