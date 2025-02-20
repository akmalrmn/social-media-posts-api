import { IsBoolean, IsDate, IsEnum, isNotEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from './enum';


export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  payment: PaymentMethod;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}