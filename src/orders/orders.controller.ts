import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotImplementedException, ParseIntPipe, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { UpdateOrderDto } from './dto';

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
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersMicroService.send({ cmd: 'findAllOrders' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersMicroService.send({ cmd: 'findOneOrder' }, id);
  }

  @Patch()
  updateOrderStatus(@Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersMicroService.send({ cmd: 'changeOrderStatus' }, updateOrderDto);
  }
}
