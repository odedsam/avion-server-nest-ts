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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsQueryDto = exports.ProductCategory = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["PLANTS"] = "plants";
    ProductCategory["CHAIRS"] = "chairs";
    ProductCategory["CERAMICS"] = "ceramics";
    ProductCategory["LIGHTS"] = "lights";
    ProductCategory["TABLES"] = "tables";
})(ProductCategory || (exports.ProductCategory = ProductCategory = {}));
class ProductsQueryDto {
    category;
    sort;
    offset;
    limit;
    priceRanges;
}
exports.ProductsQueryDto = ProductsQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? value.toLowerCase() : value),
    (0, class_validator_1.IsIn)(Object.values(ProductCategory)),
    __metadata("design:type", String)
], ProductsQueryDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([
        'price-asc',
        'price-desc',
        'name',
        'availability',
        'rating',
        'height',
        'depth',
    ]),
    __metadata("design:type", String)
], ProductsQueryDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (Array.isArray(value) ? value : [value])),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProductsQueryDto.prototype, "priceRanges", void 0);
//# sourceMappingURL=products-query.dto.js.map