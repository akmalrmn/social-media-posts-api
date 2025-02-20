import { PaymentMethod } from "@prisma/client";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditItemDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  platform?: string;

  @IsNotEmpty()
  @IsOptional()
  dueDate?: Date;

  @IsEnum(PaymentMethod)
  @IsOptional()
  payment?: PaymentMethod;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}