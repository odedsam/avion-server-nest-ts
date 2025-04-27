import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ProductsModule } from '../products/products.module'; // Import ProductsModule to access ProductsService
import { AdminService } from './admin.service';

@Module({
  imports: [ProductsModule],
  controllers: [AdminController],
  providers:[AdminService]
})
export class AdminModule {}
