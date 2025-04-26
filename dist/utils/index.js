"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.getProductByCategory = exports.categoryIndex = exports.buildCategoryIndex = void 0;
const data_1 = require("../api/data");
const buildCategoryIndex = (allProducts) => {
    const categoryIndex = new Map();
    allProducts.flatMap((categoryProducts) => categoryProducts.forEach((product) => {
        const category = product.category;
        if (!categoryIndex.has(category)) {
            categoryIndex.set(category, []);
        }
        categoryIndex.get(category)?.push(product);
    }));
    return categoryIndex;
};
exports.buildCategoryIndex = buildCategoryIndex;
exports.categoryIndex = (0, exports.buildCategoryIndex)(data_1.AllProducts);
const getProductByCategory = (cat) => {
    return exports.categoryIndex.get(cat) || [];
};
exports.getProductByCategory = getProductByCategory;
const getAllCategories = (offset, limit) => {
    const allOptions = data_1.AllProducts.flatMap((item) => [...item]).slice(offset, limit);
    return allOptions;
};
exports.getAllCategories = getAllCategories;
//# sourceMappingURL=index.js.map