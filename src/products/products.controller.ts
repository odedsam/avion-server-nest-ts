import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { getProductOperationStatus, getProductsResponseStatus, getProductQueryStatus } from 'src/docs/product.docs';
import { ProductsService } from './products.service';
import { CategoryDto } from './dto/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Get()
  @ApiOperation(getProductOperationStatus)
  @ApiResponse(getProductsResponseStatus)
  @ApiQuery(getProductQueryStatus)
  @UsePipes(new ValidationPipe({ transform: true }))
  getProducts(@Query() query: any): any {
    const categoryDTO = CategoryDto.fromQuery(query);
    return this.productService.getProductByCategory(categoryDTO);
  }
}
