import { IsBoolean, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

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
  @IsOptional()
  @IsString()
  @IsEnum(['true', 'false'])
  engine_check: string;
  @IsOptional()
  @IsString()
  @IsEnum(['true', 'false'])
  gearbox_check: string;
}

export class DeleteAdDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
