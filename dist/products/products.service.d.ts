import { ConfigService } from '@nestjs/config';
import { ProductsQueryDto } from './dto/products-query.dto';
export declare class ProductsService {
    private readonly config;
    private readonly products;
    private readonly categories;
    constructor(config: ConfigService);
    getFilteredProducts(query: ProductsQueryDto): {
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
            createdAt?: Date;
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
            priceRanges: {
                range: string;
                count: number;
            }[];
            colors: {
                key: string;
                count: number;
            }[];
            brands: {
                key: string;
                count: number;
            }[];
            materials: {
                key: string;
                count: number;
            }[];
        };
    };
    private countPriceRanges;
    private countByField;
}
