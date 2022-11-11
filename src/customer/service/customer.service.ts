import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SaveCustomerDto } from '../dtos/save-customer.dto';
import { CustomerInterface } from '../interfaces/customer.interface';
import { GetCustomerDto } from '../dtos/get-customer.dto';
import { PatchCustomerDto } from '../dtos/patch-customer.dto';

@Injectable()
export class CustomerService {
  customers: CustomerInterface[] = [
    {
      uuid: '1',
      nombre: 'Sebastian',
      apellidos: 'Barrera Marín',
      telefono: 1111111,
      documento: '123456789',
    },
    {
      uuid: '2',
      nombre: 'Santiago',
      apellidos: 'Barrera Marín',
      telefono: 2222222,
      documento: '789456123',
    },
    {
      uuid: '3',
      nombre: 'Humberto',
      telefono: 3333333,
      documento: '456789123',
    },
  ];
  getCustomers(): GetCustomerDto[] {
    return this.customers;
  }
  getCustomerByUuid(uuid: string): GetCustomerDto {
    const customer = this.customers.find(
      (customer: GetCustomerDto) => customer.uuid == uuid,
    );
    if (customer == undefined) {
      throw new HttpException(
        `Customer with uuid ${uuid} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return customer;
  }
  createCustomer(newCustomer: SaveCustomerDto): SaveCustomerDto {
    this.customers.push(newCustomer);
    return newCustomer;
  }
  updateCustomer(
    uuid: string,
    customerUpdate: SaveCustomerDto,
  ): SaveCustomerDto {
    const customer = this.customers.find(
      (customer: SaveCustomerDto) => customer.uuid == uuid,
    );
    if (customer == undefined) {
      throw new HttpException(
        `Customer with uuid ${uuid} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    customer.nombre = customerUpdate.nombre;
    customer.apellidos = customerUpdate.apellidos;
    customer.telefono = customerUpdate.telefono;
    customer.documento = customerUpdate.documento;
    return customer;
  }
  updatePatchCustomer(
    uuid: string,
    customerUpdate: PatchCustomerDto,
  ): PatchCustomerDto {
    const customer = this.customers.find(
      (customer: PatchCustomerDto) => customer.uuid == uuid,
    );
    if (customer == undefined) {
      throw new HttpException(
        `Customer with uuid ${uuid} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    const customerPatch: PatchCustomerDto = {
      ...customer,
      ...customerUpdate,
    };
    this.customers = this.customers.map((customer: PatchCustomerDto) => {
      return customer.uuid == uuid ? customerPatch : customer;
    });
    return customerPatch;
  }
  deleteCustomer(uuid: string): boolean {
    const customerIndex = this.customers.findIndex(
      (customer: CustomerInterface) => customer.uuid == uuid,
    );
    if (customerIndex == -1) return false;
    this.customers.splice(customerIndex, 1);
    return true;
  }
}
