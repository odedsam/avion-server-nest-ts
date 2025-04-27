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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AdminController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
let AdminController = AdminController_1 = class AdminController {
    adminService;
    logger = new common_1.Logger(AdminController_1.name);
    constructor(adminService) {
        this.adminService = adminService;
    }
    async migrateProductImages() {
        this.logger.log('Received request to migrate product image URLs.');
        try {
            const result = await this.adminService.migrateProductImageUrls();
            this.logger.log('Product image URL migration completed successfully.');
            return { message: 'Successfully migrated product image URLs.', modifiedCount: result.modifiedCount };
        }
        catch (error) {
            this.logger.error('Error during product image URL migration:', error);
            return { message: 'Failed to migrate product image URLs.', modifiedCount: 0 };
        }
    }
    async removeProductField(body) {
        this.logger.log(`Received request to remove field "${body.fieldName}" from products.`);
        try {
            const result = await this.adminService.removeProductField(body.fieldName);
            this.logger.log(`Successfully removed field "${body.fieldName}" from products.`);
            return { message: `Successfully removed field "${body.fieldName}" from products.`, modifiedCount: result.modifiedCount };
        }
        catch (error) {
            this.logger.error(`Error during removal of field "${body.fieldName}":`, error);
            return { message: `Failed to remove field "${body.fieldName}" from products.`, modifiedCount: 0 };
        }
    }
    async hello() {
        this.logger.log('Received request for /admin/helo.');
        return { message: 'Hello from admin!' };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('migrate-product-images'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "migrateProductImages", null);
__decorate([
    (0, common_1.Post)('remove-product-field'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeProductField", null);
__decorate([
    (0, common_1.Post)('hello'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "hello", null);
exports.AdminController = AdminController = AdminController_1 = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map