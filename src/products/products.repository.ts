import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductsQueryDto } from './dto/products-query.dto';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,) {}

  async findAll(query?: ProductsQueryDto): Promise<Product[]> {
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

    return this.productModel.find(mongoQuery).lean<Product[]>();
  }

  async findById(id: number): Promise<Product | null> {
    return this.productModel.findOne({ id }).lean<Product | null>();
  }


async removeNumberIdFromAllProducts(): Promise<number> {
  const result = await this.productModel.updateMany(
    {},
    { $unset: { id: 1 } }
  );
  return result.modifiedCount;
}


async updateMany(filter: any, update: any): Promise<any> {
  return this.productModel.updateMany(filter, update).exec();
}



}


