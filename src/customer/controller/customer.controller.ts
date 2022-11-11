import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { SaveCustomerDto } from '../dtos/save-customer.dto';
import { GetCustomerDto } from '../dtos/get-customer.dto';
import { PatchCustomerDto } from '../dtos/patch-customer.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ResponseInterceptor } from '../interceptors/response.interceptor';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseInterceptors(ResponseInterceptor)
  getAllCustomers(): GetCustomerDto[] {
    return this.customerService.getCustomers();
  }

  @Get(':uuid')
  @UseInterceptors(ResponseInterceptor)
  getCustomerByUuid(@Param('uuid') uuid: string): GetCustomerDto {
    return this.customerService.getCustomerByUuid(uuid);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(ResponseInterceptor)
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
  @UseGuards(AuthGuard)
  @UseInterceptors(ResponseInterceptor)
  updateCustomer(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    customerUpdate: SaveCustomerDto,
  ): SaveCustomerDto {
    return this.customerService.updateCustomer(uuid, customerUpdate);
  }

  @Patch(':uuid')
  @UseGuards(AuthGuard)
  @UseInterceptors(ResponseInterceptor)
  updatePatchCustomer(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    customerUpdate: PatchCustomerDto,
  ): PatchCustomerDto {
    return this.customerService.updatePatchCustomer(uuid, customerUpdate);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  deleteCustomer(@Param('uuid') uuid: string): boolean {
    return this.customerService.deleteCustomer(uuid);
  }
}
