"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AdminController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("../products/products.service");
let AdminController = AdminController_1 = class AdminController {
    productsService;
    logger = new common_1.Logger(AdminController_1.name);
    constructor(productsService) {
        this.productsService = productsService;
    }
    async hello() {
        this.logger.log('Received request to remove the "id" number field from products.');
        try {
            return { message: 'Successfully initiated the removal of the "id" number field.', };
        }
        catch (error) {
            this.logger.error('Error during the removal process:', error);
            return { message: 'Failed to remove the "id" number field.' };
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('helo'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "hello", null);
exports.AdminController = AdminController = AdminController_1 = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map