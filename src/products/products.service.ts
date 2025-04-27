import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductsRepository } from './products.repository';
import { ProductsQueryDto } from './dto/products-query.dto';
import { getSupabaseImageUrl } from 'src/utils/getSupabaseImageUrl';
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

    const supabaseUrlBuilder = getSupabaseImageUrl(this.config);

    const productsWithImageUrls = filtered.map((product) => ({
      ...product,  productImage: supabaseUrlBuilder(product.productImage),}));

    return {
      products: productsWithImageUrls.slice(0, 30),
      filtersMeta,
    };
  }
}
