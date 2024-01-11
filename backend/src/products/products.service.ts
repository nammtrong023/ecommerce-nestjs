import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  FilterProductsAndPagination,
  FilterProductsType,
  FilterType,
  ProductFilterType,
} from 'types';
import { parseFilters } from 'utils/filters';
import { PrismaService } from 'src/prisma.service';
import { Product } from '@prisma/client';
import { ColorsService } from 'src/colors/colors.service';
import { SizesService } from 'src/sizes/sizes.service';
import { parseProductsFilters } from 'utils/filter-products';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private colorService: ColorsService,
    private sizeService: SizesService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { sizeIds, colorIds, images, ...filteredUpdateProductDto } =
      createProductDto;

    await this.colorService.isExistingColors(colorIds);
    await this.sizeService.isExistingSizes(sizeIds);

    const createdProduct = await this.prisma.product.create({
      data: {
        ...filteredUpdateProductDto,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    const sizesData = sizeIds.map((sizeId) => ({
      size: { connect: { id: sizeId } },
    }));

    const colorsData = colorIds.map((colorId) => ({
      color: { connect: { id: colorId } },
    }));

    const updatedProduct = await this.prisma.product.update({
      where: { id: createdProduct.id },
      data: {
        sizes: {
          create: sizesData,
        },
        colors: {
          create: colorsData,
        },
      },
    });

    return updatedProduct;
  }

  async findAll(filter: FilterType): Promise<ProductFilterType> {
    const { itemsPerPage, page, skip, search } = parseFilters(filter);
    const includesClause = await this.getIncludesClause();

    const products = await this.prisma.product.findMany({
      take: itemsPerPage,
      skip,
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
      include: includesClause,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return {
      data: products,
      itemsPerPage,
      currentPage: page,
      total: products.length,
    };
  }

  async findOne(productId: string): Promise<Product> {
    const includesClause = await this.getIncludesClause();

    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
      },
      include: includesClause,
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async existingProducts(productIds: string[]) {
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (!products) {
      throw new NotFoundException();
    }

    return true;
  }

  async filter(filterType: FilterProductsAndPagination) {
    const { catId, colorId, sizeId, price, sort } =
      parseProductsFilters(filterType);

    const includesClause = await this.getIncludesClause();

    const products = await this.prisma.product.findMany({
      where: {
        categoryId: catId,
        sizes: { some: { sizeId } },
        colors: { some: { colorId } },
        price: {
          gte: 0,
          lte: price ? parseInt(price.toString()) : 1000000000,
        },
      },
      include: includesClause,
      orderBy: {
        price: sort ? sort : undefined,
      },
    });

    return {
      data: products,
    };
  }

  async filterProductsByCatId(catId: string, filter: FilterProductsType) {
    const { colorId, price, sizeId, sort } = parseProductsFilters(filter);
    const includesClause = await this.getIncludesClause();

    const products = await this.prisma.product.findMany({
      where: {
        categoryId: catId,
        sizes: { some: { sizeId } },
        colors: { some: { colorId } },
        price: {
          gte: 0,
          lte: price ? parseInt(price.toString()) : 1000000000,
        },
      },
      orderBy: {
        price: sort ? sort : undefined,
      },
      include: includesClause,
    });

    return products;
  }

  async getSimilarProduct(catId: string) {
    const includesClause = await this.getIncludesClause();

    const products = await this.prisma.product.findMany({
      where: {
        categoryId: catId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: includesClause,
    });

    return products;
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.findOne(productId);

    const { sizeIds, colorIds, images, ...filteredUpdateProductDto } =
      updateProductDto;

    const sizesData = sizeIds.map((sizeId) => ({
      size: { connect: { id: sizeId } },
    }));

    const colorsData = colorIds.map((colorId) => ({
      color: { connect: { id: colorId } },
    }));

    await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...filteredUpdateProductDto,
        images: {
          deleteMany: {},
        },
        sizes: { deleteMany: {} },
        colors: { deleteMany: {} },
      },
    });

    const product = await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: { data: images },
        },
        sizes: { create: sizesData },
        colors: { create: colorsData },
      },
    });

    return product;
  }

  async destroy(productId: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) throw new NotFoundException('Product not found');

      const deletedSize = await this.prisma.productsAndSizes.deleteMany({
        where: {
          productId,
        },
      });

      const deletedColor = await this.prisma.productsAndColors.deleteMany({
        where: {
          productId,
        },
      });

      if (!deletedSize || !deletedColor) {
        throw new NotFoundException('Unable to delete');
      }

      await this.prisma.product.delete({
        where: {
          id: productId,
        },
      });
    } catch (error) {
      console.log(error);
      throw new ConflictException('Unable to remove product');
    }
  }

  async getIncludesClause() {
    const includesClause = {
      images: true,
      category: true,
      sizes: {
        select: {
          id: true,
          size: {
            select: { id: true, value: true },
          },
        },
      },
      colors: {
        select: {
          id: true,
          color: {
            select: { id: true, name: true, value: true },
          },
        },
      },
    };

    return includesClause;
  }
}
