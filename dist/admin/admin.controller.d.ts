import { ProductsService } from '../products/products.service';
export declare class AdminController {
    private readonly productsService;
    private readonly logger;
    constructor(productsService: ProductsService);
    hello(): Promise<{
        message: string;
    }>;
}
