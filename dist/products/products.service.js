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
                    boundaries: [0, 100, 200, 300, 400],
                    default: '400+',
                    output: {
                        count: { $sum: 1 }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    value: {
                        $cond: {
                            if: { $eq: ['$_id', '400+'] },
                            then: '400+',
                            else: {
                                $concat: [
                                    { $toString: '$_id' },
                                    '-',
                                    { $toString: { $subtract: [{ $add: ['$_id', 100] }, 1] } }
                                ]
                            }
                        }
                    },
                    count: 1
                }
            }
        ];
        const colorsAggregation = [
            {
                $project: {
                    _id: 0,
                    colorsArray: {
                        $cond: {
                            if: { $isArray: '$colors' },
                            then: '$colors',
                            else: { $split: ['$colors', ','] },
                        },
                    },
                },
            },
            { $unwind: '$colorsArray' },
            { $group: { _id: '$colorsArray', count: { $sum: 1 } } },
            { $project: { _id: 0, value: '$_id', count: 1 } },
        ];
        const brandsAggregation = [
            { $group: { _id: '$brand', count: { $sum: 1 } } },
            { $project: { _id: 0, value: '$_id', count: 1 } },
        ];
        const materialsAggregation = [
            { $group: { _id: '$material', count: { $sum: 1 } } },
            { $project: { _id: 0, value: '$_id', count: 1 } },
        ];
        const tagsAggregation = [
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $project: { _id: 0, value: '$_id', count: 1 } },
        ];
        const [priceRangesResult, colorsResult, brandsResult, materialsResult, tagsResult] = await Promise.all([
            this.productRepo.aggregateProducts(aggregationPipeline.concat(priceRangesAggregation)),
            this.productRepo.aggregateProducts(aggregationPipeline.concat(colorsAggregation)),
            this.productRepo.aggregateProducts(aggregationPipeline.concat(brandsAggregation)),
            this.productRepo.aggregateProducts(aggregationPipeline.concat(materialsAggregation)),
            this.productRepo.aggregateProducts(aggregationPipeline.concat(tagsAggregation)),
        ]);
        const filtersMeta = {
            price: priceRangesResult,
            colors: colorsResult,
            brands: brandsResult,
            materials: materialsResult,
            tags: tagsResult
        };
        let filtered = [...initProducts];
        if (sort && sort_1.sortMap[sort]) {
            filtered = sort_1.sortFunctions[sort_1.sortMap[sort]](filtered);
        }
        return {
            products: filtered.slice(0, 30),
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