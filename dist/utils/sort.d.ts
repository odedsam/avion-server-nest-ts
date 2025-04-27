import type { Product } from '../types';
export declare const sortFunctions: {
    sortByHighPrice: (category: Product[]) => Product[];
    sortByLowPrice: (category: Product[]) => Product[];
    sortByName: (category: Product[]) => Product[];
    sortByAvailability: (category: Product[]) => Product[];
    sortByRating: (category: Product[]) => Product[];
    sortByHeight: (category: Product[]) => Product[];
    sortByDepth: (category: Product[]) => Product[];
};
