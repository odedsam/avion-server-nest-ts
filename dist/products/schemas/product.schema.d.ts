import { Document } from 'mongoose';
export type ProductDocument = Product & Document;
declare class Dimensions {
    width: number;
    height: number;
    depth: number;
}
declare class Shipping {
    weight: number;
    dimensions: Dimensions;
}
declare class ProductDescription {
    main: string;
    descOne: string;
    descTwo: string;
    descThree: string;
}
declare class ProductDimensions {
    height: string;
    weight: string;
    depth: string;
}
export declare class Product {
    id: number;
    name: string;
    slug: string;
    brand: string;
    productImage: string;
    productTitle: string;
    productPrice: number;
    category: string;
    material: string;
    isAvailable: boolean;
    stock: number;
    ratings: number;
    tags: string[];
    colors: string[];
    shipping: Shipping;
    productDescription: ProductDescription;
    productDimensions: ProductDimensions;
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
export {};
