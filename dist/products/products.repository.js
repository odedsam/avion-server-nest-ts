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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schemas/product.schema");
let ProductsRepository = class ProductsRepository {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async findAll(query) {
        const { category, priceRanges } = query;
        const mongoQuery = {};
        if (category) {
            mongoQuery.category = category;
        }
        if (priceRanges?.length) {
            mongoQuery.$or = priceRanges.map((range) => {
                const [min, max] = range.split('-').map(Number);
                return { productPrice: { $gte: min, $lte: max } };
            });
        }
        return this.productModel.find(mongoQuery).lean();
    }
    async findById(id) {
        return this.productModel.findOne({ id }).lean();
    }
    async removeNumberIdFromAllProducts() {
        const result = await this.productModel.updateMany({}, { $unset: { id: 1 } });
        return result.modifiedCount;
    }
    async updateMany(filter, update) {
        return this.productModel.updateMany(filter, update).exec();
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map