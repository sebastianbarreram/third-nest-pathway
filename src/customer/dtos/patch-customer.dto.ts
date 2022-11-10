import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { CustomerInterface } from '../interfaces/customer.interface';
export class SaveCustomerDto implements CustomerInterface {
  @IsOptional()
  @IsUUID()
  uuid: string;

  @IsOptional()
  @IsString({
    message: 'The `nombre` argument must be of type string',
  })
  nombre: string;

  @IsOptional()
  @IsString({
    message: 'The `lastname` argument must be of type string',
  })
  apellidos?: string;

  @IsOptional()
  @IsInt({
    message: 'The `telefono` argument must be of type number',
  })
  telefono: number;

  @IsOptional()
  @IsString({
    message: 'The `documento` argument must be of type string',
  })
  documento: string;
}
