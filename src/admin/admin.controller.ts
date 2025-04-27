import { Controller, Post, HttpCode, HttpStatus, Logger, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {}

  @Post('migrate-product-images')
  @HttpCode(HttpStatus.OK)
  async migrateProductImages(): Promise<{ message: string; modifiedCount: number }> {
    this.logger.log('Received request to migrate product image URLs.');
    try {
      const result = await this.adminService.migrateProductImageUrls();
      this.logger.log('Product image URL migration completed successfully.');
      return { message: 'Successfully migrated product image URLs.', modifiedCount: result.modifiedCount };
    } catch (error) {
      this.logger.error('Error during product image URL migration:', error);
      return { message: 'Failed to migrate product image URLs.', modifiedCount: 0 };
    }
  }

  @Post('remove-product-field')
  @HttpCode(HttpStatus.OK)
  async removeProductField(@Body() body: { fieldName: string }): Promise<{ message: string; modifiedCount: number }> {
    this.logger.log(`Received request to remove field "${body.fieldName}" from products.`);
    try {
      const result = await this.adminService.removeProductField(body.fieldName);
      this.logger.log(`Successfully removed field "${body.fieldName}" from products.`);
      return { message: `Successfully removed field "${body.fieldName}" from products.`, modifiedCount: result.modifiedCount };
    } catch (error) {
      this.logger.error(`Error during removal of field "${body.fieldName}":`, error);
      return { message: `Failed to remove field "${body.fieldName}" from products.`, modifiedCount: 0 };
    }
  }

  @Post('hello')
  @HttpCode(HttpStatus.OK)
  async hello(): Promise<{ message: string }> {
    this.logger.log('Received request for /admin/helo.');
    return { message: 'Hello from admin!' };
  }
}
