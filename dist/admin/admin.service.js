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
var AdminService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const admin_repository_1 = require("./admin.repository");
const imageMigration_1 = require("../utils/imageMigration");
let AdminService = AdminService_1 = class AdminService {
    adminRepository;
    logger = new common_1.Logger(AdminService_1.name);
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async migrateProductImageUrls() {
        this.logger.log('Initiating product image URL migration (Admin Service using Repository)...');
        const supabaseBaseUrlRegex = /^https:\/\/[\w-]+\.supabase\.co\/storage\/v1\/object\/public\/[\w-]+/;
        try {
            const productsToUpdate = await this.adminRepository.findAllProducts();
            let modifiedCount = 0;
            for (const product of productsToUpdate) {
                if (product.productImage && supabaseBaseUrlRegex.test(product.productImage)) {
                    const extractedPath = (0, imageMigration_1.extractImagePath)(product.productImage);
                    if (extractedPath) {
                        await this.adminRepository.updateManyProducts({ _id: product._id }, { $set: { imageUrl: extractedPath } });
                        modifiedCount++;
                    }
                }
            }
            this.logger.log(`Successfully migrated ${modifiedCount} image URLs (Admin Service using Repository).`);
            return { modifiedCount };
        }
        catch (error) {
            this.logger.error('Error during product image URL migration (Admin Service using Repository):', error);
            throw error;
        }
    }
    async removeProductField(fieldName) {
        this.logger.log(`Initiating removal of field "${fieldName}" from Products (Admin Service using Repository)...`);
        try {
            const result = await this.adminRepository.updateManyProducts({}, { $unset: { [fieldName]: 1 } });
            this.logger.log(`Successfully removed field "${fieldName}" from ${result.modifiedCount} Products (Admin Service using Repository).`);
            return { modifiedCount: result.modifiedCount };
        }
        catch (error) {
            this.logger.error(`Error during removal of field "${fieldName}" (Admin Service using Repository):`, error);
            throw error;
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = AdminService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository])
], AdminService);
//# sourceMappingURL=admin.service.js.map