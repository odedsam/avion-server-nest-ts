import type { Product } from '../types';
export const sortFunctions = {
  sortByHighPrice: (category: Product[]) => {
    return category.toSorted((a: any, b: any) => b.productPrice - a.productPrice);
  },
  sortByLowPrice: (category: Product[]) => {
    return category.toSorted((a: any, b: any) => a.productPrice - b.productPrice);
  },
  sortByName: (category: Product[]) => {
    return category.toSorted((a: any, b: any) => a.name.localeCompare(b.name));
  },
  sortByAvailability: (category: Product[]) => {
    return category.toSorted((a: any, b: any) => b.stock - a.stock);
  },
  sortByRating: (category: Product[]) => {
    return category.toSorted((a: any, b: any) => b.ratings - a.ratings);
  },
  sortByHeight: (category: Product[]) => {
    return category.toSorted((a: any, b: any) => b.shipping.dimensions.height - a.shipping.dimensions.height);
  },
  sortByDepth: (category: Product[]) => {
    return category.toSorted((a: any, b: any) => b.shipping.dimensions.depth - a.shipping.dimensions.depth);
  },
};

export const sortMap: Record<string, keyof typeof sortFunctions> = {
      'price-desc': 'sortByHighPrice',
      'price-asc': 'sortByLowPrice',
      name: 'sortByName',
      availability: 'sortByAvailability',
      rating: 'sortByRating',
      height: 'sortByHeight',
      depth: 'sortByDepth',
    };
