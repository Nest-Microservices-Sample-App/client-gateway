import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotImplementedException, ParseIntPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersMicroService: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersMicroService.send({ cmd: 'createOrder' }, createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersMicroService.send({ cmd: 'findAllOrders' }, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersMicroService.send({ cmd: 'findOneOrder' }, id);
  }

  @Patch(':id')
  updateOrderStatus(@Param('id', ParseIntPipe) id: number) {
    throw new NotImplementedException();
  }
}
