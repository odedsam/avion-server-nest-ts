import { ConfigService } from '@nestjs/config';
import { ProductsModule } from '../products/products.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
export declare namespace ConfigUtil {
    class Origin {
        static getOriginUrl(configService: ConfigService): string | undefined;
    }
    class Swagger {
        static config: DocumentBuilder;
        static init(app: INestApplication<any>): void;
    }
    class Mongoose {
        static mongooseModule: import("@nestjs/common").DynamicModule;
    }
    class AppModule {
        static imports: (typeof ProductsModule | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule>)[];
    }
}
export declare const corsOptions: {
    origin: string[];
    methods: string[];
    allowedHeaders: string[];
    optionsSuccessStatus: number;
};
