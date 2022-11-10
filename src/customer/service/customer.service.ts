import { Injectable } from '@nestjs/common';
import { CustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
  customers: CustomerDto[] = [
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
      apellidos: 'Barrera Bernal',
      telefono: 3333333,
      documento: '456789123',
    },
  ];
  deleteCustomer(uuid: string): boolean {
    const customerIndex = this.customers.findIndex(
      (customer: CustomerDto) => customer.uuid == uuid,
    );
    if (customerIndex == -1) return false;
    this.customers.splice(customerIndex, 1);
    return true;
  }
  updatePatchCustomer(uuid: string, customerUpdate: CustomerDto) {
    const customer = this.customers.find(
      (customer: CustomerDto) => customer.uuid == uuid,
    );
    if (customer != undefined) {
      const customerPatch: CustomerDto = {
        ...customer,
        ...customerUpdate,
      };
      this.customers = this.customers.map((customer: CustomerDto) => {
        return customer.uuid == uuid ? customerPatch : customer;
      });
      return customerPatch;
    }
    return customer;
  }
  updateCustomer(uuid: string, customerUpdate: CustomerDto) {
    const customer = this.customers.find(
      (customer: CustomerDto) => customer.uuid == uuid,
    );
    if (customer != undefined) {
      customer.nombre = customerUpdate.nombre;
      customer.apellidos = customerUpdate.apellidos;
      customer.telefono = customerUpdate.telefono;
      customer.documento = customerUpdate.documento;
    }
    return customer;
  }
  createCustomer(newCustomer: CustomerDto): CustomerDto {
    this.customers.push(newCustomer);
    return newCustomer;
  }
  getCustomerByUuid(uuid: string): import('../dto/customer.dto').CustomerDto {
    return this.customers.find(
      (customer: CustomerDto) => customer.uuid == uuid,
    );
  }
  getCustomers(): import('../dto/customer.dto').CustomerDto[] {
    return this.customers;
  }
}
