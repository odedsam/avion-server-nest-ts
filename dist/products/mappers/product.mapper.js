"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProductEntity = void 0;
const toProductEntity = (product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand: product.brand,
    productImage: product.productImage,
    productTitle: product.productTitle,
    productPrice: product.productPrice,
    category: product.category,
    material: product.material,
    isAvailable: product.isAvailable,
    stock: product.stock,
    ratings: product.ratings,
    tags: product.tags,
    colors: product.colors,
    shipping: product.shipping,
    productDescription: product.productDescription,
    productDimensions: product.productDimensions,
});
exports.toProductEntity = toProductEntity;
//# sourceMappingURL=product.mapper.js.map