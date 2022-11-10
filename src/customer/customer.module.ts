import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomerController } from './controller/customer.controller';
import { BodyLoggerMiddleware } from './middleware/body-logger.middleware';
import { CustomerService } from './service/customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BodyLoggerMiddleware)
      .forRoutes(
        { path: 'customer/:uuid', method: RequestMethod.PUT },
        { path: 'customer', method: RequestMethod.POST },
      );
  }
}
