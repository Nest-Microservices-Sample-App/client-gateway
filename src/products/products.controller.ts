import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE, PRODUCTS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly productsClient: ClientProxy
  ) { }


  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this.productsClient.send('product.create', product);
  }

  @Get()
  getProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send('product.find_all', paginationDto);
  }

  @Get(':id')
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send('product.find_by_id', { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProduct: UpdateProductDto) {
    return this.productsClient.send('product.update', {
      id,
      ...updateProduct
    })
      .pipe(catchError(error => {
        throw new RpcException(error);
      }));
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send('product.delete', { id })
      .pipe(catchError(error => {
        throw new RpcException(error);
      }));
  }
}
