export declare class ProductEntity {
    id: number;
    name: string;
    slug?: string;
    brand?: string;
    productImage?: string;
    productTitle?: string;
    productPrice?: number;
    category?: string;
    material?: string;
    isAvailable?: boolean;
    stock?: number;
    ratings?: number;
    tags?: string[];
    colors?: string[];
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
}
