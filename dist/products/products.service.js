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
const products_repository_1 = require("./products.repository");
const getSupabaseImageUrl_1 = require("../utils/getSupabaseImageUrl");
const sort_1 = require("../utils/sort");
let ProductsService = class ProductsService {
    config;
    productRepo;
    constructor(config, productRepo) {
        this.config = config;
        this.productRepo = productRepo;
    }
    async getFilteredProducts(query) {
        const { category, sort } = query;
        let initProducts = await this.productRepo.findAll(query);
        if (category && !initProducts.length) {
            throw new common_1.NotFoundException(`Category ${category} not found`);
        }
        const aggregationPipeline = [];
        if (category) {
            aggregationPipeline.push({ $match: { category: { $regex: new RegExp(`^${category}$`, 'i') } } });
        }
        const priceRangesAggregation = [
            {
                $bucket: {
                    groupBy: '$productPrice',
                    boundaries: [1, 100, 200, 300, 400],
                    default: '400+',
                    output: {
                        count: { $sum: 1 },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    range: {
                        $concat: [
                            { $toString: '$_id' },
                            '-',
                            {
                                $toString: {
                                    $cond: {
                                        if: { $eq: ['$_id', '400+'] },
                                        then: '999999',
                                        else: { $subtract: [{ $add: [{ $arrayElemAt: ['$boundaries', { $indexOfArray: ['$boundaries', '$_id'] }] }] }, -1] }
                                    },
                                },
                            },
                        ],
                    },
                    count: '$count',
                },
            },
        ];
        const colorsAggregation = [
            { $unwind: '$colors' },
            { $group: { _id: '$colors', count: { $sum: 1 } } },
            { $project: { _id: 0, key: '$_id', count: 1 } },
        ];
        const brandsAggregation = [
            { $group: { _id: '$brand', count: { $sum: 1 } } },
            { $project: { _id: 0, key: '$_id', count: 1 } },
        ];
        const materialsAggregation = [
            { $group: { _id: '$material', count: { $sum: 1 } } },
            { $project: { _id: 0, key: '$_id', count: 1 } },
        ];
        const [priceRangesResult, colorsResult, brandsResult, materialsResult] = await Promise.all([
            this.productRepo.aggregateProducts(aggregationPipeline.concat(priceRangesAggregation)),
            this.productRepo.aggregateProducts(aggregationPipeline.concat(colorsAggregation)),
            this.productRepo.aggregateProducts(aggregationPipeline.concat(brandsAggregation)),
            this.productRepo.aggregateProducts(aggregationPipeline.concat(materialsAggregation)),
        ]);
        const filtersMeta = {
            priceRanges: priceRangesResult,
            colors: colorsResult,
            brands: brandsResult,
            materials: materialsResult,
        };
        let filtered = [...initProducts];
        if (sort && sort_1.sortMap[sort]) {
            filtered = sort_1.sortFunctions[sort_1.sortMap[sort]](filtered);
        }
        const supabaseUrlBuilder = (0, getSupabaseImageUrl_1.getSupabaseImageUrl)(this.config);
        const productsWithImageUrls = filtered.map((product) => ({
            ...product, productImage: supabaseUrlBuilder(product.productImage),
        }));
        return {
            products: productsWithImageUrls.slice(0, 30),
            filtersMeta,
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, products_repository_1.ProductsRepository])
], ProductsService);
//# sourceMappingURL=products.service.js.map