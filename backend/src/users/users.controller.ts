import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { GetCurrentUserId } from 'src/common/decorator/get-current-user-id';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('current-user')
  @HttpCode(HttpStatus.OK)
  getCurrentUser(@GetCurrentUserId() userId: string): Promise<User> {
    return this.usersService.getCurrentUser(userId);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUser(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  destroy(@Param('userId') userId: string) {
    return this.usersService.destroy(userId);
  }
}
