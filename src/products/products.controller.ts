import { Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsQueryDto } from './dto/products-query.dto';
import { ProductDocs } from 'src/docs/product.docs';
import { Docs } from 'src/utils/swaggerDecorators';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @Docs(ProductDocs)

  getProducts(@Query() query: ProductsQueryDto) {
    return this.productService.getFilteredProducts(query);
  }




}
