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
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Dimensions = class Dimensions {
    width;
    height;
    depth;
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Dimensions.prototype, "width", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Dimensions.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Dimensions.prototype, "depth", void 0);
Dimensions = __decorate([
    (0, mongoose_1.Schema)()
], Dimensions);
let Shipping = class Shipping {
    weight;
    dimensions;
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Shipping.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Dimensions }),
    __metadata("design:type", Dimensions)
], Shipping.prototype, "dimensions", void 0);
Shipping = __decorate([
    (0, mongoose_1.Schema)()
], Shipping);
let ProductDescription = class ProductDescription {
    main;
    descOne;
    descTwo;
    descThree;
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductDescription.prototype, "main", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductDescription.prototype, "descOne", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductDescription.prototype, "descTwo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductDescription.prototype, "descThree", void 0);
ProductDescription = __decorate([
    (0, mongoose_1.Schema)()
], ProductDescription);
let ProductDimensions = class ProductDimensions {
    height;
    weight;
    depth;
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductDimensions.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductDimensions.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ProductDimensions.prototype, "depth", void 0);
ProductDimensions = __decorate([
    (0, mongoose_1.Schema)()
], ProductDimensions);
let Product = class Product {
    id;
    name;
    slug;
    brand;
    productImage;
    productTitle;
    productPrice;
    category;
    material;
    isAvailable;
    stock;
    ratings;
    tags;
    colors;
    shipping;
    productDescription;
    productDimensions;
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "productImage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "productTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Product.prototype, "productPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Product.prototype, "material", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Product.prototype, "isAvailable", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Product.prototype, "ratings", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Product.prototype, "colors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Shipping }),
    __metadata("design:type", Shipping)
], Product.prototype, "shipping", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: ProductDescription }),
    __metadata("design:type", ProductDescription)
], Product.prototype, "productDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: ProductDimensions }),
    __metadata("design:type", ProductDimensions)
], Product.prototype, "productDimensions", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)()
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
//# sourceMappingURL=product.schema.js.map