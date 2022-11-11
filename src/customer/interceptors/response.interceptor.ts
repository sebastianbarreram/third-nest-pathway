import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { GetCustomerDto } from '../dtos/get-customer.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: GetCustomerDto) => {
        if (data instanceof Array) {
          return data.map((customer: GetCustomerDto) =>
            customer.apellidos === undefined
              ? { ...customer, apellidos: null }
              : customer,
          );
        }
        return data.apellidos === undefined
          ? { ...data, apellidos: null }
          : data;
      }),
    );
  }
}
