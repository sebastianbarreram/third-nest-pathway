import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { SaveCustomerDto } from '../dtos/save-customer.dto';
import { GetCustomerDto } from '../dtos/get-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getAllCustomers(): GetCustomerDto[] {
    return this.customerService.getCustomers();
  }

  @Get(':uuid')
  getCustomerByUuid(@Param('uuid') uuid: string): GetCustomerDto {
    return this.customerService.getCustomerByUuid(uuid);
  }

  @Post()
  createCustomer(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newCustomer: SaveCustomerDto,
  ): SaveCustomerDto {
    return this.customerService.createCustomer(newCustomer);
  }

  @Put(':uuid')
  updateCustomer(
    @Param('uuid') uuid: string,
    @Body() customerUpdate: SaveCustomerDto,
  ): SaveCustomerDto {
    return this.customerService.updateCustomer(uuid, customerUpdate);
  }

  @Patch(':uuid')
  updatePatchCustomer(
    @Param('uuid') uuid: string,
    @Body() customerUpdate: SaveCustomerDto,
  ): SaveCustomerDto {
    return this.customerService.updatePatchCustomer(uuid, customerUpdate);
  }

  @Delete(':uuid')
  deleteCustomer(@Param('uuid') uuid: string): boolean {
    return this.customerService.deleteCustomer(uuid);
  }
}
