import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductsQueryDto } from './dto/products-query.dto';
export declare class ProductsRepository {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    findAll(query?: ProductsQueryDto): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
    removeNumberIdFromAllProducts(): Promise<number>;
    updateMany(filter: any, update: any): Promise<any>;
}
