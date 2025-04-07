import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './common/middelware/logger.middelware';

@Module({
  imports: [
    ConfigModule.forRoot({  isGlobal: true, }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
