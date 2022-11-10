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
import { InvoiceDto } from '../dto/invoice.dto';
import { InvoiceService } from '../service/invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  getAllInvoices(): InvoiceDto[] {
    return this.invoiceService.getInvoices();
  }

  @Get(':uuid')
  getInvoiceByUuid(@Param('uuid') uuid: string): InvoiceDto | undefined {
    return this.invoiceService.getInvoiceByUuid(uuid);
  }

  @Post()
  createInvoice(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newInvoice: InvoiceDto,
  ): InvoiceDto {
    return this.invoiceService.createInvoice(newInvoice);
  }

  @Put(':uuid')
  updateInvoice(
    @Param('uuid') uuid: string,
    @Body() invoiceUpdate: InvoiceDto,
  ) {
    return this.invoiceService.updateInvoice(uuid, invoiceUpdate);
  }

  @Patch(':uuid')
  updatePatchInvoice(
    @Param('uuid') uuid: string,
    @Body() invoiceUpdate: InvoiceDto,
  ) {
    return this.invoiceService.updatePatchInvoice(uuid, invoiceUpdate);
  }

  @Delete(':uuid')
  deleteInvoice(@Param('uuid') uuid: string): boolean {
    return this.invoiceService.deleteInvoice(uuid);
  }
}
