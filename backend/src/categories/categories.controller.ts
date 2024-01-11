import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AtGuard } from 'src/common/guards/at.guard';
import { Public } from 'src/common/decorator/public.decorator';

@UseGuards(AtGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.categoriesService.getAll();
  }

  @Public()
  @Get(':categoryId')
  findOne(@Param('categoryId') categoryId: string) {
    return this.categoriesService.findOne(categoryId);
  }

  @Patch(':categoryId')
  update(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Delete(':categoryId')
  destroy(@Param('categoryId') categoryId: string) {
    return this.categoriesService.destroy(categoryId);
  }
}
