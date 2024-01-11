import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  FilterProductsAndPagination,
  FilterProductsType,
  FilterType,
} from 'types';
import { Public } from 'src/common/decorator/public.decorator';
import { AtGuard } from 'src/common/guards/at.guard';

@UseGuards(AtGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll(@Query() filter: FilterType) {
    return this.productsService.findAll(filter);
  }

  @Public()
  @Get('filter-products-by-cat/:catId')
  filterProductsByCatId(
    @Param('catId') catId: string,
    @Query() filter: FilterProductsType,
  ) {
    return this.productsService.filterProductsByCatId(catId, filter);
  }

  @Public()
  @Get('filter-products')
  filterProduct(@Query() filterType: FilterProductsAndPagination) {
    return this.productsService.filter(filterType);
  }

  @Public()
  @Get('similar-products/:catId')
  getSimilarProduct(@Param('catId') catId: string) {
    return this.productsService.getSimilarProduct(catId);
  }

  @Public()
  @Get(':productId')
  findOne(@Param('productId') productId: string) {
    return this.productsService.findOne(productId);
  }

  @Patch(':productId')
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete(':productId')
  destroy(@Param('productId') productId: string) {
    return this.productsService.destroy(productId);
  }
}
