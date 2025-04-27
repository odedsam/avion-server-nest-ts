import { Controller, Post, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { AdminService } from './admin.service'; // Import AdminService

@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {} // Inject AdminService

  @Post('remove-number-id')
  @HttpCode(HttpStatus.OK)
  async removeNumberId(): Promise<{ message: string; count?: number }> {
    this.logger.log('Received request to remove the "id" number field from products.');
    try {
      const count = await this.adminService.removeNumberIdFromAllProductsAdmin();
      return { message: 'Successfully initiated the removal of the "id" number field.', count };
    } catch (error) {
      this.logger.error('Error during the removal process:', error);
      return { message: 'Failed to remove the "id" number field.' };
    }
  }
}
