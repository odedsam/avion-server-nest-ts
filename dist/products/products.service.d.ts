import { ConfigService } from '@nestjs/config';
import { ProductsRepository } from './products.repository';
import { ProductsQueryDto } from './dto/products-query.dto';
export declare class ProductsService {
    private readonly config;
    private readonly productRepo;
    constructor(config: ConfigService, productRepo: ProductsRepository);
    getFilteredProducts(query: ProductsQueryDto): Promise<{
        products: import("./schemas/product.schema").Product[];
        filtersMeta: Record<string, any[]>;
    }>;
}
