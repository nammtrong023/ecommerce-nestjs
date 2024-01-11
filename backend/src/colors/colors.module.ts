import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService, PrismaService, UsersService],
})
export class ColorsModule {}
