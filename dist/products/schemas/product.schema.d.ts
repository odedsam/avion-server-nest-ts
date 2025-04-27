import { Document } from 'mongoose';
export type ProductDocument = Product & Document;
export declare class Product {
    id: number;
    name?: string;
    slug?: string;
    productImage?: string;
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
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, Document<unknown, any, Product, any> & Product & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, import("mongoose").FlatRecord<Product>, {}> & import("mongoose").FlatRecord<Product> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
