import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello';
  }
  getPort(): string {
    return this.configService.get<string>('PORT');
  }
  getStatus(): { [key: string]: string } {
    return {
      status: 'Running',
      version: '1.0.0',
      enviroment: this.configService.get<string>('NODE_ENV') || 'development',
    };
  }
}
