import { MiddlewareConsumer, Module,  NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ProductsModule } from './products/products.module';
import { GetUserAgentMiddleware } from './middlewares/get-user-agent.middleware';
import { SubscriptionGuard } from './guards/user-subscription.guard';

@Module({
  imports: [UserModule, ExpensesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService,SubscriptionGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetUserAgentMiddleware)
    .forRoutes({path:'*', method:RequestMethod.ALL})
  }
  
}
