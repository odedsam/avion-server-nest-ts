import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductsQueryDto } from './dto/products-query.dto';
import { getProductOperationStatus, getProductsResponseStatus, getProductQueryStatus } from 'src/docs/product.docs';

@ApiTags('products')
@Controller('products')

export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()

  @ApiOperation(getProductOperationStatus)
  @ApiResponse(getProductsResponseStatus)
  @ApiQuery(getProductQueryStatus[0])
  @ApiQuery(getProductQueryStatus[1])
  @ApiQuery(getProductQueryStatus[2])

  @UsePipes(new ValidationPipe({ transform: true }))
  getProducts(@Query() query: ProductsQueryDto) {
    return this.productService.getFilteredProducts(query);
  }
}
