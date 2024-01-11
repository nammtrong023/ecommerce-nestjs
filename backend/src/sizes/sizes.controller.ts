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
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { AtGuard } from 'src/common/guards/at.guard';

@UseGuards(AtGuard)
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}
  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.sizesService.findAll();
  }

  @Public()
  @Get(':sizeId')
  findOne(@Param('sizeId') sizeId: string) {
    return this.sizesService.findOne(sizeId);
  }

  @Patch(':sizeId')
  update(
    @Param('sizeId') sizeId: string,
    @Body() updateSizeDto: UpdateSizeDto,
  ) {
    return this.sizesService.update(sizeId, updateSizeDto);
  }

  @Delete(':sizeId')
  destroy(@Param('sizeId') sizeId: string) {
    return this.sizesService.destroy(sizeId);
  }
}
