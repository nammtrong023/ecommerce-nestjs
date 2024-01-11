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
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { AtGuard } from 'src/common/guards/at.guard';

@UseGuards(AtGuard)
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @Public()
  @Get(':colorId')
  findOne(@Param('colorId') colorId: string) {
    return this.colorsService.findOne(colorId);
  }

  @Patch(':colorId')
  update(
    @Param('colorId') colorId: string,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return this.colorsService.update(colorId, updateColorDto);
  }

  @Delete(':colorId')
  destroy(@Param('colorId') colorId: string) {
    return this.colorsService.destroy(colorId);
  }
}
