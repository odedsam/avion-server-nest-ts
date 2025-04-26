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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const data_1 = require("../api/data");
const sort_1 = require("../utils/sort");
const getSupabaseImageUrl_1 = require("../utils/getSupabaseImageUrl");
let ProductsService = class ProductsService {
    config;
    products = data_1.AllProducts;
    categories = data_1.categories;
    constructor(config) {
        this.config = config;
    }
    getFilteredProducts(query) {
        const { category, sort, priceRanges } = query;
        let baseProducts = this.products.flat();
        if (category) {
            const lower = category.toLowerCase();
            if (!this.categories[lower]) {
                throw new common_1.NotFoundException(`Category ${lower} not found`);
            }
            baseProducts = this.categories[lower];
        }
        const filtersMeta = {
            priceRanges: this.countPriceRanges(baseProducts),
            colors: this.countByField(baseProducts, 'colors'),
            brands: this.countByField(baseProducts, 'brand'),
            materials: this.countByField(baseProducts, 'material'),
        };
        let filtered = [...baseProducts];
        if (priceRanges?.length) {
            filtered = filtered.filter((p) => priceRanges.some((range) => {
                const [min, max] = range.split('-').map(Number);
                return p.productPrice >= min && p.productPrice <= max;
            }));
        }
        const sortMap = {
            'price-desc': 'sortByHighPrice',
            'price-asc': 'sortByLowPrice',
            name: 'sortByName',
            availability: 'sortByAvailability',
            rating: 'sortByRating',
            height: 'sortByHeight',
            depth: 'sortByDepth',
        };
        if (sort && sortMap[sort]) {
            filtered = sort_1.sortFunctions[sortMap[sort]](filtered);
        }
        const supabaseUrlBuilder = (0, getSupabaseImageUrl_1.getSupabaseImageUrl)(this.config);
        const productsWithImageUrls = filtered.map((product) => ({
            ...product,
            productImage: supabaseUrlBuilder(product.productImage),
        }));
        return {
            products: productsWithImageUrls.slice(0, 30),
            filtersMeta,
        };
    }
    countPriceRanges(products) {
        const ranges = ['1-99', '100-199', '200-299', '300-399'];
        return ranges.map((range) => {
            const [min, max] = range.split('-').map(Number);
            const count = products.filter((p) => p.productPrice >= min && p.productPrice <= max).length;
            return { range, count };
        });
    }
    countByField(products, field) {
        const counts = {};
        products.forEach((p) => {
            const value = p[field];
            if (Array.isArray(value)) {
                value.forEach((v) => {
                    counts[v] = (counts[v] || 0) + 1;
                });
            }
            else if (typeof value === 'string') {
                counts[value] = (counts[value] || 0) + 1;
            }
        });
        return Object.entries(counts).map(([key, count]) => ({ key, count }));
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ProductsService);
//# sourceMappingURL=products.service.js.map