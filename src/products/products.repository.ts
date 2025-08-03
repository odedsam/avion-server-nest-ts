import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductsQueryDto } from './dto/products-query.dto';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async findAll(
    query?: ProductsQueryDto,
    limit?: number,
    offset?: number,
  ): Promise<Product[]> {
    const mongoQuery = this.buildFindAllQuery(query);
    const find = this.productModel.find(mongoQuery).lean<Product[]>();

    if (limit !== undefined) {
      find.limit(limit);
    }
    if (offset !== undefined) {
      find.skip(offset);
    }

    return find.exec();
  }

  async findOptionsByCategory(category: string): Promise<{
    brands: string[];
    colors: string[];
    materials: string[];
  }> {
    const brands = await this.productModel.distinct('brand', { category });
    const colors = await this.productModel.distinct('colors', { category });
    const materials = await this.productModel.distinct('material', { category });

    return { brands, colors, materials };
  }


  // async findOptionsByCategory(category: string): Promise<{
  //   brands: string[];
  //   colors: string[];
  //   materials: string[];
  //   tags: string[];
  //   minPrice: number;
  //   maxPrice: number;
  // }> {
  //   const [brands, colors, materials, tags] = await Promise.all([
  //     this.productModel.distinct('brand', { category }),
  //     this.productModel.distinct('colors', { category }),
  //     this.productModel.distinct('material', { category }),
  //     this.productModel.distinct('tags', { category }),
  //   ]);

  //   const priceStats = await this.productModel
  //     .aggregate([
  //       { $match: { category } },
  //       {
  //         $group: {
  //           _id: null,
  //           minPrice: { $min: '$productPrice' },
  //           maxPrice: { $max: '$productPrice' },
  //         },
  //       },
  //     ])
  //     .exec();

  //   const { minPrice = 0, maxPrice = 0 } = priceStats[0] || {};

  //   return { brands, colors, materials, tags, minPrice, maxPrice };
  // }



  async findById(id: number): Promise<Product | null> {
    return this.productModel.findOne({ id }).lean<Product | null>().exec();
  }

  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).lean<Product[]>().exec();
  }

  async findByPriceRange(min: number, max: number): Promise<Product[]> {
    return this.productModel.find({ productPrice: { $gte: min, $lte: max } }).lean<Product[]>().exec();
  }

  async findByBrand(brand: string): Promise<Product[]> {
    return this.productModel.find({ brand }).lean<Product[]>().exec();
  }

  async aggregateProducts(pipeline: any[]): Promise<any[]> {
    return this.productModel.aggregate(pipeline).exec();
  }

  async updateMany(filter: any, update: any): Promise<any> {
    return this.productModel.updateMany(filter, update).exec();
  }

  private buildFindAllQuery(query?: ProductsQueryDto): any {
    const { category, priceRanges, colors, brands, materials } = query;
    const mongoQuery: any = {};

    if (category) {
      mongoQuery.category = category;
    }

    if (priceRanges?.length) {
      mongoQuery.$or = priceRanges.map((range) => {
        const [min, max] = range.split('-').map(Number);
        return { productPrice: { $gte: min, $lte: max } };
      });
    }

    if (colors?.length) {
      mongoQuery.colors = { $in: colors };
    }

    if (brands?.length) {
      mongoQuery.brand = { $in: brands };
    }

    if (materials?.length) {
      mongoQuery.material = { $in: materials };
    }

    return mongoQuery;
  }

  async countAll(filter: any = {}): Promise<number> {
    return this.productModel.countDocuments(filter).exec();
  }

  async findMany(
    filter: any,
    skip: number,
    limit: number,
    sort: any = {},
  ): Promise<ProductDocument[]> {
    return this.productModel.find(filter).skip(skip).limit(limit).sort(sort).exec();
  }

  async count(filter: any): Promise<number> {
    return this.productModel.countDocuments(filter).exec();
  }
}
