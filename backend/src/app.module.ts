import { Module } from '@nestjs/common';
import { SizesModule } from './sizes/sizes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ColorsModule } from './colors/colors.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SizesModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    ColorsModule,
    ProductsModule,
    MailModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
