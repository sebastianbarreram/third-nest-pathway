import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { randomUUID } from 'crypto';
export class InvoiceDetailDto {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  code: number;

  constructor(data?: InvoiceDetailDto) {
    this.uuid = data?.uuid ?? randomUUID();
    this.name = data?.name;
    this.price = data?.price;
  }
}
