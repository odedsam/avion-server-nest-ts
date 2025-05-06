import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductsQueryDto } from './dto/products-query.dto';
export declare class ProductsRepository {
    private readonly productModel;
    constructor(productModel: Model<ProductDocument>);
    findAll(query?: ProductsQueryDto, limit?: number, offset?: number): Promise<Product[]>;
    findOptionsByCategory(category: string): Promise<{
        brands: string[];
        colors: string[];
        materials: string[];
    }>;
    findById(id: number): Promise<Product | null>;
    findByCategory(category: string): Promise<Product[]>;
    findByPriceRange(min: number, max: number): Promise<Product[]>;
    findByBrand(brand: string): Promise<Product[]>;
    aggregateProducts(pipeline: any[]): Promise<any[]>;
    updateMany(filter: any, update: any): Promise<any>;
    private buildFindAllQuery;
    countAll(filter?: any): Promise<number>;
    findMany(filter: any, skip: number, limit: number, sort?: any): Promise<ProductDocument[]>;
    count(filter: any): Promise<number>;
}
