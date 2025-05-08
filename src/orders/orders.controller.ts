import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotImplementedException, ParseIntPipe, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { NATS_SERVICE, ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { UpdateOrderDto } from './dto';
import { catchError, firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly ordersMicroService: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersMicroService.send('order.create', createOrderDto);
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {

      const orders = await firstValueFrom(
        this.ordersMicroService.send('order.find_all', orderPaginationDto)
      );

      return orders;
    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersMicroService.send('order.find_by_id', id)
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch()
  async updateOrderStatus(@Body() updateOrderDto: UpdateOrderDto) {
    try {
      const order = await firstValueFrom(
        this.ordersMicroService.send('order.change_status', updateOrderDto)
      )

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
