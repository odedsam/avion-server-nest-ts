"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const products_repository_1 = require("../../src/products/products.repository");
const app_module_1 = require("../../src/app.module");
async function removeNumberIdScript() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const productsRepository = app.get(products_repository_1.ProductsRepository);
    const configService = app.get(config_1.ConfigService);
    const logger = new common_1.Logger('RemoveNumberIdScript');
    try {
        const model = productsRepository.productModel;
        const result = await model.updateMany({}, { $unset: { id: 1 } });
        logger.log(`Successfully removed the 'id' number field from ${result.modifiedCount} products.`);
    }
    catch (error) {
        logger.error('Error removing the "id" number field:', error);
    }
    finally {
        await app.close();
    }
}
removeNumberIdScript();
//# sourceMappingURL=remove-number-id.js.map