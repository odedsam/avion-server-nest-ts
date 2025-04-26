"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const railwayUrl = configService.get('RAILWAY_URL');
    const allowedOrigins = [configService.get('CORS_ORIGIN') || '*', railwayUrl].filter(Boolean);
    app.enableCors({
        origin: allowedOrigins,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Avion Description API')
        .setVersion('1.0')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, swaggerDocument);
    const PORT = configService.get('PORT', 5001);
    await app.listen(PORT);
    console.log(`Application Running on http://localhost:${PORT}`);
    console.log(`Swagger available at http://localhost:${PORT}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map