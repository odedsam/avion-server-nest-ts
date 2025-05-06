export declare enum ProductCategory {
    PLANTS = "plants",
    CHAIRS = "chairs",
    CERAMICS = "ceramics",
    LIGHTS = "lights",
    TABLES = "tables"
}
export declare class ProductsQueryDto {
    category?: ProductCategory;
    sort?: string;
    offset?: number;
    limit?: number;
    priceRanges?: string[];
    colors?: string[];
    brands?: string[];
    materials?: string[];
}
