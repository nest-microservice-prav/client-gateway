import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { NATS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({cmd: 'create_product'}, createProductDto)
    .pipe(
      catchError( (error) => {throw new RpcException(error);})
    );
  }

  @Get()
  async getAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({cmd: 'find_all_products'}, paginationDto);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {

    return this.client.send({cmd: 'find_one_product'}, {id})
    .pipe(
      catchError( (error) => {throw new RpcException(error);})
    );

    // Otra forma de hacerlo
    //try {
    //  const product = await firstValueFrom(
    //    this.productsClient.send({cmd: 'find_one_product'}, {id})
    //  );
    //  return product;

    //} catch (error) {
    //  throw new RpcException(error);
    //}
    
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.client.send({cmd: 'delete_product'}, {id})
    .pipe(
      catchError( (error) => {throw new RpcException(error);})
    );
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.client.send({cmd: 'update_product'}, {id, ...updateProductDto})
    .pipe(
      catchError( (error) => {throw new RpcException(error);})
    );
  }


}
