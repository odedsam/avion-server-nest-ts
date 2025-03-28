import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getStatusOperation, getStatusResponse } from './docs/app.docs';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @ApiOperation(getStatusOperation)
  @ApiResponse(getStatusResponse)
  getStatus(): string {
    return this.appService.getHello();
  }
}
