import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { randomUUID } from 'crypto';
import { InvoiceDetailDto } from './invoice-datail.dto';
export class InvoiceDto {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsNotEmpty()
  @IsString()
  customerUuid: string;

  @IsNotEmpty()
  @IsString()
  nit: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => InvoiceDetailDto)
  detail: InvoiceDetailDto[];

  @IsNotEmpty()
  quantity: number[];

  constructor(data?: InvoiceDto) {
    this.uuid = data?.uuid ?? randomUUID();
    this.customerUuid = data?.customerUuid;
    this.nit = data?.nit;
    this.date = data?.date ?? Date();
    this.detail = data?.detail;
    this.quantity = data?.quantity;
  }
}
