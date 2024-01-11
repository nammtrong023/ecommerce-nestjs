import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma.service';
import { ColorsService } from 'src/colors/colors.service';
import { SizesService } from 'src/sizes/sizes.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, ColorsService, SizesService],
})
export class ProductsModule {}
