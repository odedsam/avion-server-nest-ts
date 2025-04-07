import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type AppStatus = {
  status: string;
  version: string;
  enviroment: string;
};

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello';
  }
  getPort(): string {
    return this.configService.get<string>('PORT');
  }

  getStatus(): AppStatus {
    const statusInfo = {
      status: 'Running',
      version: '1.0.0',
      enviroment: this.configService.get<string>('NODE_ENV') || 'development',
    };
    return statusInfo;
  }
}
