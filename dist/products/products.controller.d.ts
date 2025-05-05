import { ProductsService } from './products.service';
import { ProductsQueryDto } from './dto/products-query.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    getProducts(query: ProductsQueryDto): Promise<{
        products: import("./schemas/product.schema").Product[];
        filtersMeta: Record<string, any[]>;
    }>;
}
