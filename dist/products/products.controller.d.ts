import { ProductsService } from './products.service';
import { ProductsQueryDto } from './dto/products-query.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    getProducts(query: ProductsQueryDto): Promise<{
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
