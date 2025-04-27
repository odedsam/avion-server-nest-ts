import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductsQueryDto } from './dto/products-query.dto';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async findAll(query?: ProductsQueryDto): Promise<Product[]> {
    const mongoQuery = this.buildFindAllQuery(query);
    return this.productModel.find(mongoQuery).lean<Product[]>().exec();
  }

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
    const { category, priceRanges } = query;
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

    return mongoQuery;
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
