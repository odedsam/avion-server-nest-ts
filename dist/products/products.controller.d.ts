import { ProductsService } from './products.service';
import { ProductsQueryDto } from './dto/products-query.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    getProducts(query: ProductsQueryDto): Promise<{
        filtersMeta: {
            price: any[];
            colors: any[];
            brands: any[];
            materials: any[];
            tags: any[];
        };
        products?: undefined;
        totalCount?: undefined;
    } | {
        products: import("./schemas/product.schema").Product[];
        filtersMeta: {
            price: any[];
            colors: any[];
            brands: any[];
            materials: any[];
            tags: any[];
        };
        totalCount: number;
    }>;
}
