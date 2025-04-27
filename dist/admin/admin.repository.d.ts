import { Model } from 'mongoose';
import { ProductDocument } from '../products/schemas/product.schema';
export declare class AdminRepository {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    findAllProducts(): Promise<ProductDocument[]>;
    updateManyProducts(filter: any, update: any): Promise<any>;
}
