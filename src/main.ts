import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ConfigUtil,corsOptions } from './utils/config';
import { LogUtil } from './utils/log';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());

  ConfigUtil.Swagger.init(app);

 const port = Number(process.env.PORT) || configService.get<number>('PORT', 3000);
await app.listen(port, '0.0.0.0');

  LogUtil.report(ConfigUtil.Origin.getOriginUrl(configService), port);
}
bootstrap();
