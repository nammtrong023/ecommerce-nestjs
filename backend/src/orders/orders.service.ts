import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductsService,
    private userService: UsersService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { orderItems } = createOrderDto;

      const productIds = orderItems.map((orderItem) => orderItem.productId);
      await this.productService.existingProducts(productIds);

      await this.userService.getUser(createOrderDto.userId);

      const order = await this.prisma.order.create({
        data: {
          ...createOrderDto,
          orderItems: {
            createMany: {
              data: orderItems,
            },
          },
        },
      });

      return order;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        orderItems: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  }

  async getTrashedOrders(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  }

  async findOne(orderId: string): Promise<Order> {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
      },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async getOrderItemByOrderId(orderId: string) {
    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        orderId,
      },
      include: {
        product: true,
      },
    });

    if (!orderItems) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return orderItems;
  }

  async destroy(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    await this.prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  }

  async getOrdersByUserId(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: {
          include: {
            product: { include: { images: true } },
          },
        },
      },
    });

    return orders;
  }
}
