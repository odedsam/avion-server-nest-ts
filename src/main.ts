import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ConfigUtil,corsOptions } from './utils/config';
import { LogUtil } from './utils/log';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const origin = ConfigUtil.Origin.getOriginUrl(configService);
  const port = configService.get<number>('PORT', 8080);


  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());


  ConfigUtil.Swagger.init(app);
  await app.listen(port);
  LogUtil.report(origin, port);
}
bootstrap();
