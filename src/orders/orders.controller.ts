import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, NotImplementedException, ParseIntPipe, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { UpdateOrderDto } from './dto';
import { catchError } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';

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
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersMicroService.send({ cmd: 'findAllOrders' }, orderPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersMicroService.send({ cmd: 'findOneOrder' }, id)
      .pipe(catchError(err => {
        throw new RpcException(err);
      }));
  }

  @Patch()
  updateOrderStatus(@Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersMicroService.send({ cmd: 'changeOrderStatus' }, updateOrderDto).pipe(catchError(err => {
      throw new RpcException(err);
    }));
  }
}
