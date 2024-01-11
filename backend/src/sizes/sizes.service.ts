import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma.service';
import { Size } from '@prisma/client';

@Injectable()
export class SizesService {
  constructor(private prisma: PrismaService) {}

  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    const size = await this.prisma.size.create({
      data: createSizeDto,
    });

    return size;
  }

  async findAll(): Promise<Size[]> {
    const sizes = await this.prisma.size.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return sizes;
  }

  async findOne(sizeId: string): Promise<Size> {
    const size = await this.prisma.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    if (!size) throw new NotFoundException('Size not found');

    return size;
  }

  async isExistingSizes(sizeIds: string[]) {
    const sizes = await this.prisma.size.findMany({
      where: {
        id: { in: sizeIds },
      },
    });

    if (!sizes) {
      throw new NotFoundException();
    }
  }

  async update(sizeId: string, updateSizeDto: UpdateSizeDto): Promise<Size> {
    await this.findOne(sizeId);

    const updatedSize = await this.prisma.size.update({
      where: {
        id: sizeId,
      },
      data: updateSizeDto,
    });

    return updatedSize;
  }

  async destroy(sizeId: string) {
    const size = await this.prisma.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    if (!size) throw new NotFoundException('Size not found');

    await this.prisma.size.delete({
      where: {
        id: sizeId,
      },
    });
  }
}
