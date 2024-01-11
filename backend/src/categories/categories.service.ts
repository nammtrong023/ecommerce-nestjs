import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Public } from 'src/common/decorator/public.decorator';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });

    return category;
  }

  @Public()
  async getAll() {
    const categories = await this.prisma.category.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return categories;
  }

  @Public()
  async findOne(categoryId: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async update(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.findOne(categoryId);

    const updatedCategory = await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: updateCategoryDto,
    });

    return updatedCategory;
  }

  async destroy(categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) throw new NotFoundException('Category not found');

    await this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}
