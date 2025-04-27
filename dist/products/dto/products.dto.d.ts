export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
export declare class SortOptionDto {
    sortBy?: string;
    sortOrder?: SortOrder;
}
export declare class FilterOptionDto {
    colors?: string[];
    brands?: string[];
    materials?: string[];
    priceRanges?: string[];
}
export declare class ProductsQueryDto {
    category?: string;
    sort?: SortOptionDto;
    filters?: FilterOptionDto;
    page?: number;
    limit?: number;
}
