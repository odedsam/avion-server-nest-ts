import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const railwayUrl = configService.get<string>('RAILWAY_URL');
  const allowedOrigins = [configService.get<string>('CORS_ORIGIN') || '*', railwayUrl].filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
  });

  app.useGlobalPipes(new ValidationPipe());


  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Avion Description API')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);


  const PORT = configService.get<number>('PORT', 5001);
  await app.listen(PORT);
  console.log(`Application Running on http://localhost:${PORT}`);
  console.log(`Swagger available at http://localhost:${PORT}/api`);
}
bootstrap();
