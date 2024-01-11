import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hasEmail = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (hasEmail) {
      throw new BadRequestException('Email has been used');
    }

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({});

    return users;
  }

  async getCurrentUser(userId: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new HttpException('User is not found', 404);
      }

      return user;
    } catch (err) {
      throw new HttpException('Invalid token', 401);
    }
  }

  async getUserByRole(id: string, role: Role): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        role,
      },
    });

    return user;
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    await this.getUser(userId);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateUserDto,
    });
  }

  async destroy(topicId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: topicId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.delete({
      where: {
        id: topicId,
      },
    });
  }
}
