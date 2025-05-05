import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductsRepository } from './products.repository';
import { ProductsQueryDto } from './dto/products-query.dto';

import { sortFunctions, sortMap } from 'src/utils/sort';

@Injectable()
export class ProductsService {
  constructor(private readonly config: ConfigService, private readonly productRepo: ProductsRepository) {}

  async getFilteredProducts(query: ProductsQueryDto) {
    const { category, sort } = query;

    let initProducts = await this.productRepo.findAll(query);

    if (category && !initProducts.length) {
      throw new NotFoundException(`Category ${category} not found`);
    }

    const aggregationPipeline = [];

    if (category) {
      aggregationPipeline.push({ $match: { category: { $regex: new RegExp(`^${category}$`, 'i') } } });
    }

    // const priceRangesAggregation = [
    //   {
    //     $bucket: {
    //       groupBy: '$productPrice',
    //       boundaries: [1, 100, 200, 300, 400],
    //       default: '400+',
    //       output: {
    //         count: { $sum: 1 },
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       range: {
    //         $concat: [
    //           { $toString: '$_id' },
    //           '-',
    //           {
    //             $toString: {
    //               $cond: {
    //                 if: { $eq: ['$_id', '400+'] },
    //                 then: '999999',
    //                 else: { $subtract: [{$add: [{$arrayElemAt: ['$boundaries', {$indexOfArray: ['$boundaries', '$_id']}]}]}, -1] }
    //               },
    //             },
    //           },
    //         ],
    //       },
    //       count: '$count',
    //     },
    //   },
    // ];

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

    // const colorsAggregation = [
    //   { $unwind: '$colors' },
    //   { $group: { _id: '$colors', count: { $sum: 1 } } },
    //   { $project: { _id: 0, value: '$_id', count: 1 } },
    // ];

    // function getColorsByCategoryAggregation(category) {
    //   return [
    //     { $match: { category: category } }, // Dynamic category filtering
    //     {
    //       $project: {
    //         _id: 0,
    //         colorsArray: {
    //           $cond: {
    //             if: { $isArray: '$colors' },
    //             then: '$colors',
    //             else: { $split: ['$colors', ','] },
    //           },
    //         },
    //       },
    //     },
    //     { $unwind: '$colorsArray' },
    //     { $group: { _id: '$colorsArray', count: { $sum: 1 } } },
    //     { $project: { _id: 0, value: '$_id', count: 1 } },
    //   ];
    // }

    // // Example usage:
    // const tablesColorsPipeline = getColorsByCategoryAggregation('tables');
    // const ceramicsColorsPipeline = getColorsByCategoryAggregation('ceramics');





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

    const [priceRangesResult, colorsResult, brandsResult, materialsResult,tagsResult] = await Promise.all([
      this.productRepo.aggregateProducts(aggregationPipeline.concat(priceRangesAggregation)),
      this.productRepo.aggregateProducts(aggregationPipeline.concat(colorsAggregation)),
      this.productRepo.aggregateProducts(aggregationPipeline.concat(brandsAggregation)),
      this.productRepo.aggregateProducts(aggregationPipeline.concat(materialsAggregation)),
      this.productRepo.aggregateProducts(aggregationPipeline.concat(tagsAggregation)),

    ]);

    const filtersMeta: Record<string, any[]> = {
      price: priceRangesResult,
      colors: colorsResult,
      brands: brandsResult,
      materials: materialsResult,
      tags:tagsResult
    };

    let filtered = [...initProducts];

    if (sort && sortMap[sort]) {
      filtered = sortFunctions[sortMap[sort]](filtered);
    }


    return {
      products: filtered.slice(0,30),
      filtersMeta,
    };
  }
}

