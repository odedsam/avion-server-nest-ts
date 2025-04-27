"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortMap = exports.sortFunctions = void 0;
exports.sortFunctions = {
    sortByHighPrice: (category) => {
        return category.toSorted((a, b) => b.productPrice - a.productPrice);
    },
    sortByLowPrice: (category) => {
        return category.toSorted((a, b) => a.productPrice - b.productPrice);
    },
    sortByName: (category) => {
        return category.toSorted((a, b) => a.name.localeCompare(b.name));
    },
    sortByAvailability: (category) => {
        return category.toSorted((a, b) => b.stock - a.stock);
    },
    sortByRating: (category) => {
        return category.toSorted((a, b) => b.ratings - a.ratings);
    },
    sortByHeight: (category) => {
        return category.toSorted((a, b) => b.shipping.dimensions.height - a.shipping.dimensions.height);
    },
    sortByDepth: (category) => {
        return category.toSorted((a, b) => b.shipping.dimensions.depth - a.shipping.dimensions.depth);
    },
};
exports.sortMap = {
    'price-desc': 'sortByHighPrice',
    'price-asc': 'sortByLowPrice',
    name: 'sortByName',
    availability: 'sortByAvailability',
    rating: 'sortByRating',
    height: 'sortByHeight',
    depth: 'sortByDepth',
};
//# sourceMappingURL=sort.js.map