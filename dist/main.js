"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const config_2 = require("./utils/config");
const log_1 = require("./utils/log");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors(config_2.corsOptions);
    app.useGlobalPipes(new common_1.ValidationPipe());
    config_2.ConfigUtil.Swagger.init(app);
    const port = Number(process.env.PORT) || configService.get('PORT', 3000);
    await app.listen(port, '0.0.0.0');
    log_1.LogUtil.report(config_2.ConfigUtil.Origin.getOriginUrl(configService), port);
}
bootstrap();
//# sourceMappingURL=main.js.map