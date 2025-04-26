import { Product } from '../types/Product';
export declare const filterFunctions: {
    filterByBrand: (products: Product[]) => {
        key: string;
        count: number;
    }[];
    filterByPriceRange: (products: Product[]) => {
        range: string;
        count: number;
    }[];
    filterByTags: (products: Product[]) => {
        key: string;
        count: number;
    }[];
    filterByMaterial: (products: Product[]) => {
        key: string;
        count: number;
    }[];
    filterByColors: (products: Product[]) => {
        key: string;
        count: number;
    }[];
    filterByStock: (products: Product[]) => Product[];
    filterByAvailability: (products: Product[]) => Product[];
    filterByRating: (products: Product[]) => {
        key: number;
        count: number;
    }[];
};
