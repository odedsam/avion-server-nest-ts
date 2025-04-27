import { Controller, Post, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly productsService: ProductsService) {}

  @Post('helo')
  @HttpCode(HttpStatus.OK)
  async hello(): Promise<{ message: string;  }> {
    this.logger.log('Received request to remove the "id" number field from products.');
    try {
      return { message: 'Successfully initiated the removal of the "id" number field.',  };
    } catch (error) {
      this.logger.error('Error during the removal process:', error);
      return { message: 'Failed to remove the "id" number field.' };
    }
  }
}
