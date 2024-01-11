import { Color } from '@prisma/client';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma.service';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ColorsService {
  constructor(private prisma: PrismaService) {}

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const allColors = await this.prisma.color.findMany();

    const isExistingValue = allColors.some(
      (color) => color.value === createColorDto.value,
    );

    if (isExistingValue) {
      throw new BadRequestException('Already exists color value');
    }

    const color = await this.prisma.color.create({
      data: createColorDto,
    });

    return color;
  }

  async findAll(): Promise<Color[]> {
    const colors = await this.prisma.color.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return colors;
  }

  async findOne(colorId: string): Promise<Color> {
    const color = await this.prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });

    if (!color) throw new NotFoundException('Color not found');

    return color;
  }

  async isExistingColors(colorIds: string[]) {
    const colors = await this.prisma.color.findMany({
      where: {
        id: { in: colorIds },
      },
    });

    if (!colors) {
      throw new NotFoundException();
    }
  }

  async update(
    colorId: string,
    updateColorDto: UpdateColorDto,
  ): Promise<Color> {
    await this.findOne(colorId);
    const allColors = await this.prisma.color.findMany();

    const isExistingValue = allColors.some(
      (color) => color.value === updateColorDto.value,
    );

    if (isExistingValue) {
      throw new BadRequestException('Already exists color value');
    }

    const updatedColor = await this.prisma.color.update({
      where: {
        id: colorId,
      },
      data: updateColorDto,
    });

    return updatedColor;
  }

  async destroy(colorId: string) {
    const color = await this.prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });

    if (!color) throw new NotFoundException('Color not found');

    await this.prisma.color.delete({
      where: {
        id: colorId,
      },
    });
  }
}
