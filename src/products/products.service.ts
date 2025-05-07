import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductsRepository } from './products.repository';
import { ProductsQueryDto } from './dto/products-query.dto';

import { sortFunctions, sortMap } from 'src/utils/sort';


@Injectable()
export class ProductsService {
  constructor(
    private readonly config: ConfigService,
    private readonly productRepo: ProductsRepository,
  ) {}

  async getFilteredProducts(query: ProductsQueryDto) {
    const { category, sort, limit, offset, colors, brands, materials, ...otherFilters } = query;

    const findQuery: any = {};

    if (category) {
      findQuery.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (colors?.length) {
      findQuery.colors = { $in: colors };
    }

    if (brands?.length) {
      findQuery.brand = { $in: brands };
    }

    if (materials?.length) {
      findQuery.material = { $in: materials };
    }

    for (const key in otherFilters) {
      if (otherFilters[key] !== undefined) {
        findQuery[key] = otherFilters[key];
      }
    }

    const priceRangesAggregation = [
      {
        $bucket: {
          groupBy: '$productPrice',
          boundaries: [0, 100, 200, 300, 400],
          default: '400+',
          output: { count: { $sum: 1 } },
        },
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
                  { $toString: { $subtract: [{ $add: ['$_id', 100] }, 1] } },
                ],
              },
            },
          },
          count: 1,
        },
      },
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

    if (!category) {
      const [price, colors, brands, materials, tags] = await Promise.all([
        this.productRepo.aggregateProducts(priceRangesAggregation),
        this.productRepo.aggregateProducts(colorsAggregation),
        this.productRepo.aggregateProducts(brandsAggregation),
        this.productRepo.aggregateProducts(materialsAggregation),
        this.productRepo.aggregateProducts(tagsAggregation),
      ]);

      return {
        filtersMeta: { price, colors, brands, materials, tags },
      };
    }

    const [products, totalCount] = await Promise.all([
      this.productRepo.findAll(findQuery, limit, offset),
      this.productRepo.countAll(findQuery),
    ]);

    if (products.length === 0 && totalCount === 0) {
      throw new NotFoundException(`Category ${category} not found or has no matching products`);
    }

    const aggregationPipeline = [{ $match: findQuery }];

    const [price, colorsMeta, brandsMeta, materialsMeta, tagsMeta] = await Promise.all([
      this.productRepo.aggregateProducts([...aggregationPipeline, ...priceRangesAggregation]),
      this.productRepo.aggregateProducts([...aggregationPipeline, ...colorsAggregation]),
      this.productRepo.aggregateProducts([...aggregationPipeline, ...brandsAggregation]),
      this.productRepo.aggregateProducts([...aggregationPipeline, ...materialsAggregation]),
      this.productRepo.aggregateProducts([...aggregationPipeline, ...tagsAggregation]),
    ]);

    let sortedProducts = [...products];
    if (sort && sortMap[sort]) {
      sortedProducts = sortFunctions[sortMap[sort]](sortedProducts);
    }

    return {
      products: sortedProducts,
      filtersMeta: {
        price,
        colors: colorsMeta && colorsMeta.splice(0,25),
        brands: brandsMeta,
        materials: materialsMeta,
        tags: tagsMeta,
      },
      totalCount,
    };
  }
}
