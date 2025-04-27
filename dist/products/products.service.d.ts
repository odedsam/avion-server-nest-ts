import { ConfigService } from '@nestjs/config';
import { ProductsRepository } from './products.repository';
import { ProductsQueryDto } from './dto/products-query.dto';
export declare class ProductsService {
    private readonly config;
    private readonly productRepo;
    constructor(config: ConfigService, productRepo: ProductsRepository);
    getFilteredProducts(query: ProductsQueryDto): Promise<{
        products: {
            productImage: string;
            id: number;
            name?: string;
            slug?: string;
            productTitle?: string;
            productPrice?: number;
            category?: string;
            brand?: string;
            stock?: number;
            isAvailable?: boolean;
            ratings?: number;
            tags?: string[];
            colors?: string[];
            material?: string;
            shipping?: {
                weight?: number;
                dimensions?: {
                    width?: number;
                    height?: number;
                    depth?: number;
                };
            };
            productDescription?: {
                main?: string;
                descOne?: string;
                descTwo?: string;
                descThree?: string;
            };
            productDimensions?: {
                height?: string;
                weight?: string;
                depth?: string;
            };
        }[];
        filtersMeta: {
            priceRanges: any[];
            colors: any[];
            brands: any[];
            materials: any[];
        };
    }>;
}
