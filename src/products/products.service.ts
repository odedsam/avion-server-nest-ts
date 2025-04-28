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
                    else: { $subtract: [{$add: [{$arrayElemAt: ['$boundaries', {$indexOfArray: ['$boundaries', '$_id']}]}]}, -1] }
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

    if (sort && sortMap[sort]) {
      filtered = sortFunctions[sortMap[sort]](filtered);
    }


    return {
      products: filtered.slice(0,30),
      filtersMeta,
    };
  }
}


// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { ProductsRepository } from './products.repository';
// import { ProductsQueryDto } from './dto/products-query.dto';

// import { sortFunctions, sortMap } from 'src/utils/sort';
// const groupAndCount = (field: string) => [
//   { $group: { _id: `$${field}`, count: { $sum: 1 } } },
//   { $project: { _id: 0, key: '$_id', count: 1 } },
// ];

// const unwindAndGroupCount = (field: string) => [
//   { $unwind: `$${field}` },
//   { $group: { _id: `$${field}`, count: { $sum: 1 } } },
//   { $project: { _id: 0, key: '$_id', count: 1 } },
// ];
// @Injectable()
// export class ProductsService {
//   constructor(private readonly config: ConfigService, private readonly productRepo: ProductsRepository) {}

//   async getFilteredProducts(query: ProductsQueryDto) {
//     const { category, sort } = query;
//     const aggregationPipeline = [];

//     if (category) {
//       aggregationPipeline.push({ $match: { category: { $regex: new RegExp(`^${category}$`, 'i') } } });
//     }

//     const filtersMeta: Record<string, any[]> = {};

//     // Price Ranges - likely relevant for all categories
//     const priceRangesAggregation = [ /* ... your price range aggregation ... */ ];
//     const priceRangesResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(priceRangesAggregation));
//     filtersMeta.priceRanges = priceRangesResult;

//     switch (category?.toLowerCase()) {
//       case 'chairs':
//         // Add filters specific to chairs (e.g., material, style)
//         const chairMaterialsAggregation = [
//           { $unwind: '$material' },
//           { $group: { _id: '$material', count: { $sum: 1 } } },
//           { $project: { _id: 0, key: '$_id', count: 1 } },
//         ];
//         const chairMaterialsResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(chairMaterialsAggregation));
//         filtersMeta.materials = chairMaterialsResult;

//         const chairStylesAggregation = [
//           { $group: { _id: '$style', count: { $sum: 1 } } },
//           { $project: { _id: 0, key: '$_id', count: 1 } },
//         ];
//         const chairStylesResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(chairStylesAggregation));
//         filtersMeta.style = chairStylesResult;
//         break;

//       case 'tables':
//         // Add filters specific to tables (e.g., material, shape)
//         const tableMaterialsAggregation = [
//           { $unwind: '$material' },
//           { $group: { _id: '$material', count: { $sum: 1 } } },
//           { $project: { _id: 0, key: '$_id', count: 1 } },
//         ];
//         const tableMaterialsResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(tableMaterialsAggregation));
//         filtersMeta.materials = tableMaterialsResult;

//         const tableShapesAggregation = [
//           { $group: { _id: '$shape', count: { $sum: 1 } } },
//           { $project: { _id: 0, key: '$_id', count: 1 } },
//         ];
//         const tableShapesResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(tableShapesAggregation));
//         filtersMeta.shape = tableShapesResult;
//         break;

//       case 'ceramics':
//         // Add filters specific to ceramics (e.g., type, color)
//         const ceramicTypesAggregation = [
//           { $group: { _id: '$type', count: { $sum: 1 } } },
//           { $project: { _id: 0, key: '$_id', count: 1 } },
//         ];
//         const ceramicTypesResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(ceramicTypesAggregation));
//         filtersMeta.type = ceramicTypesResult;

//         const ceramicColorsAggregation = [
//           { $unwind: '$colors' },
//           { $group: { _id: '$colors', count: { $sum: 1 } } },
//           { $project: { _id: 0, key: '$_id', count: 1 } },
//         ];
//         const ceramicColorsResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(ceramicColorsAggregation));
//         filtersMeta.colors = ceramicColorsResult;
//         break;

//       case 'lights':
//         // Add filters specific to lights (e.g., type, color)
//         const lightTypesAggregation = [
//           { $group: { _id: '$type', count: { $sum: 1 } } },
//           { $project: { _id: 0, key: '$_id', count: 1 } },
//         ];
//         const lightTypesResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(lightTypesAggregation));
//         filtersMeta.type = lightTypesResult;

//         const lightColorsAggregation = [
//           { $unwind: '$colors' },
//           { $group: { _id: '$colors', count: { $sum: 1 } } },
//           { $project: { _id: 0, key: '$_id', count: 1 } },
//         ];
//         const lightColorsResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(lightColorsAggregation));
//         filtersMeta.colors = lightColorsResult;
//         break;

//       case 'plants':
//         // Add filters specific to plants (e.g., type, size)
//         const plantTypesAggregation = [
//           { $group: { _id: '$type', count: { $sum: 1 } } },
//           { $project: { _id: 0, key: '$_id', count: 1 } },
//         ];
//         const plantTypesResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(plantTypesAggregation));
//         filtersMeta.type = plantTypesResult;

//         const plantSizesAggregation = [
//           { $group: { _id: '$size', count: { $sum: 1 } } },
//           { $project: { _id: 0, key: '$_id', count: 1 } },
//         ];
//         const plantSizesResult = await this.productRepo.aggregateProducts(aggregationPipeline.concat(plantSizesAggregation));
//         filtersMeta.size = plantSizesResult;
//         break;

//       default:
//         // No category-specific filters
//         break;
//     }

//     // Sort Options - consistent across categories
//     filtersMeta.sortOptions = [
//       { label: 'Relevance', value: '' },
//       { label: 'Price: Low to High', value: 'price-asc' },
//       { label: 'Price: High to Low', value: 'price-desc' },
//       // ... other sort options
//     ];

//     const totalCountResult = await this.productRepo.aggregateProducts([...aggregationPipeline, { $count: 'total' }]);
//     const totalCount = totalCountResult[0]?.total || 0;

//     let initProducts = await this.productRepo.findAll(query);

//     if (category && !initProducts.length) {
//       throw new NotFoundException(`Category ${category} not found`);
//     }

//     let filtered = [...initProducts];

//     if (sort && sortMap[sort]) {
//       filtered = sortFunctions[sortMap[sort]](filtered);
//     }

//     const limit = Number(query.limit) || 30;
//     const offset = Number(query.offset) || 0;

//     return {
//       products: filtered.slice(offset, offset + limit),
//       filtersMeta,
//       totalCount,
//     };
//   }
// }
