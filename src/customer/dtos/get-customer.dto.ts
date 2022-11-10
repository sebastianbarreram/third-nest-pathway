import { CustomerInterface } from '../interfaces/customer.interface';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
export class GetCustomerDto implements CustomerInterface {
  @IsNotEmpty({
    message: 'The `nombre` argument must not be empty',
  })
  @IsUUID()
  uuid: string;

  @IsNotEmpty({
    message: 'The `nombre` argument must not be empty',
  })
  @IsString({
    message: 'The `nombre` argument must be of type string',
  })
  nombre: string;

  @IsOptional()
  @IsString({
    message: 'The `lastname` argument must be of type string',
  })
  apellidos?: string;

  @IsNotEmpty({
    message: 'The `telefono` argument must not be empty',
  })
  @IsInt({
    message: 'The `telefono` argument must be of type number',
  })
  telefono: number;

  @IsNotEmpty({
    message: 'The `documento` argument must not be empty',
  })
  @IsString({
    message: 'The `documento` argument must be of type string',
  })
  documento: string;
}
