import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(filePath: string): Promise<UploadApiResponse> {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'avion',
      });
      return result;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw error;
    }
  }
}
