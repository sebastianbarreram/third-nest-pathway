import { Injectable } from '@nestjs/common';
import { InvoiceDto } from '../dto/invoice.dto';

@Injectable()
export class InvoiceService {
  invoices: InvoiceDto[] = [
    {
      uuid: '1',
      customerUuid: '1',
      nit: 'AS123432423',
      date: Date(),
      detail: [
        {
          uuid: '1',
          name: 'Mouse',
          price: 100,
          code: 165,
        },
        {
          uuid: '3',
          name: 'Curved Gaming Monitor',
          price: 1000,
          code: 453,
        },
      ],
      quantity: [1, 2],
    },
    {
      uuid: '2',
      customerUuid: '3',
      nit: 'AL5648462',
      date: Date(),
      detail: [
        {
          uuid: '4',
          name: 'Solid State Drive SSD',
          price: 500,
          code: 547,
        },
        {
          uuid: '2',
          name: 'ATX Motherboard',
          price: 900,
          code: 445,
        },
      ],
      quantity: [4, 1],
    },
  ];
  getInvoices(): InvoiceDto[] {
    return this.invoices;
  }
  getInvoiceByUuid(uuid: string): InvoiceDto {
    return this.invoices.find((invoice: InvoiceDto) => invoice.uuid == uuid);
  }
  createInvoice(newInvoice: InvoiceDto): InvoiceDto {
    this.invoices.push(newInvoice);
    return newInvoice;
  }
  updateInvoice(uuid: string, invoiceUpdate: InvoiceDto) {
    const invoice = this.invoices.find(
      (invoice: InvoiceDto) => invoice.uuid == uuid,
    );
    if (invoice != undefined) {
      invoice.customerUuid = invoiceUpdate.customerUuid;
      invoice.nit = invoiceUpdate.nit;
      invoice.date = invoiceUpdate.date;
      invoice.detail = invoiceUpdate.detail;
      invoice.quantity = invoiceUpdate.quantity;
    }
    return invoice;
  }
  updatePatchInvoice(uuid: string, invoiceUpdate: InvoiceDto) {
    const invoice = this.invoices.find(
      (invoice: InvoiceDto) => invoice.uuid == uuid,
    );
    if (invoice != undefined) {
      const invoicePatch: InvoiceDto = {
        ...invoice,
        ...invoiceUpdate,
      };
      this.invoices = this.invoices.map((invoice: InvoiceDto) => {
        return invoice.uuid == uuid ? invoicePatch : invoice;
      });
      return invoicePatch;
    }
    return invoice;
  }
  deleteInvoice(uuid: string): boolean {
    const invoiceIndex = this.invoices.findIndex(
      (invoice: InvoiceDto) => invoice.uuid == uuid,
    );
    if (invoiceIndex == -1) return false;
    this.invoices.splice(invoiceIndex, 1);
    return true;
  }
}
