// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Product, ProductDocument } from '../products/schemas/product.schema';

// @Injectable()
// export class AdminRepository {
//   constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

//   async findAllProducts(): Promise<ProductDocument[]> {
//     return this.productModel.find().exec();
//   }

//   async updateManyProducts(filter: any, update: any): Promise<any> {
//     return this.productModel.updateMany(filter, update).exec();
//   }

// }
