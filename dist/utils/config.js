"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigUtil = void 0;
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const products_module_1 = require("../products/products.module");
const swagger_1 = require("@nestjs/swagger");
const admin_module_1 = require("../admin/admin.module");
var ConfigUtil;
(function (ConfigUtil) {
    class Origin {
        static getOriginUrl(configService) {
            return configService.get('ORIGIN_URI');
        }
    }
    ConfigUtil.Origin = Origin;
    class Swagger {
        static config = new swagger_1.DocumentBuilder()
            .setTitle('API Documentation')
            .setDescription('Avion Description API')
            .setVersion('1.0');
        static init(app) {
            const document = swagger_1.SwaggerModule.createDocument(app, Swagger.config.build());
            swagger_1.SwaggerModule.setup('api', app, document);
        }
    }
    ConfigUtil.Swagger = Swagger;
    class Mongoose {
        static mongooseModule = mongoose_1.MongooseModule.forRootAsync({
            imports: [config_1.ConfigModule],
            useFactory: async (configService) => ({
                uri: configService.get('MONGO_URI'),
            }),
            inject: [config_1.ConfigService],
        });
    }
    ConfigUtil.Mongoose = Mongoose;
    class AppModule {
        static imports = [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            Mongoose.mongooseModule,
            products_module_1.ProductsModule,
            admin_module_1.AdminModule
        ];
    }
    ConfigUtil.AppModule = AppModule;
})(ConfigUtil || (exports.ConfigUtil = ConfigUtil = {}));
//# sourceMappingURL=config.js.map