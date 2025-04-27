import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class AdminService {
  constructor(private readonly productsService: ProductsService) {}

}
