import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetCurrentUserId } from 'src/common/decorator/get-current-user-id';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  getAll() {
    return this.ordersService.findAll();
  }

  @Get('get-by-order-id/:orderId')
  getOrderItemsByOrderId(@Param('orderId') orderId: string) {
    return this.ordersService.getOrderItemByOrderId(orderId);
  }

  @Get('get-by-user-id')
  getOrdersByUserId(@GetCurrentUserId() userId: string) {
    return this.ordersService.getOrdersByUserId(userId);
  }

  @Get(':orderId')
  findOne(@Param('orderId') orderId: string) {
    return this.ordersService.findOne(orderId);
  }

  @Delete(':orderId')
  destroy(@Param('orderId') orderId: string) {
    return this.ordersService.destroy(orderId);
  }
}
