import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { ColorsService } from 'src/colors/colors.service';
import { SizesService } from 'src/sizes/sizes.service';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from 'src/common/guards/at.guard';

@Module({
  controllers: [OrdersController],

  providers: [
    OrdersService,
    PrismaService,
    ProductsService,
    UsersService,
    ColorsService,
    SizesService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class OrdersModule {}
