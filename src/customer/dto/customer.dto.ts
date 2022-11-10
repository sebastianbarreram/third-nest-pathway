import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { randomUUID } from 'crypto';
export class CustomerDto {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  apellidos?: string;

  @IsInt()
  telefono: number;

  @IsNotEmpty()
  documento: string;

  constructor(data?: CustomerDto) {
    this.uuid = data?.uuid ?? randomUUID();
    this.nombre = data?.nombre;
    if (data?.apellidos) this.apellidos = data.apellidos;
    this.telefono = data?.telefono;
    this.documento = data?.documento;
  }
}
