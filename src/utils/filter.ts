import { Product } from '../types/Product';
export const filterFunctions = {
  filterByBrand: (category: Product[]) => {
    return new Set(category.map((item) => item.brand));
  },
  filterByPriceRange: (
    category: Product[],
    minPrice: number,
    maxPrice: number,
  ) => {
    const filtered = category.filter(
      (item: any) =>
        item.productPrice !== undefined &&
        item.productPrice >= minPrice &&
        item.productPrice <= maxPrice,
    );

    if (filtered.length === 0) {
      return ['no result'];
    }
    return filtered.sort((a: any, b: any) => b.productPrice - a.productPrice);
  },

  filterByTags: (category: Product[]) => {
    const allTags = new Set(category.flatMap((item) => item.tags || []));
    return Array.from(allTags);
  },

  filterByMaterial: (category: Product[]) => {
    const allMaterials = new Set(
      category.flatMap((item: any) => item.materials || []),
    );
    return Array.from(allMaterials);
  },

  filterByColors: (category: Product[]) => {
    const allColors = Array.from(
      new Set(category.flatMap((item: any) => item.colors)),
    );
    return allColors;
  },

  filterByStock: (category: Product[]) => {
    const highStockToLowStock = category.sort(
      (bigStock: any, lowStock: any) => lowStock.stock - bigStock.stock,
    );
    return highStockToLowStock;
  },
  filterByAvailability: (category: Product[]) => {
    const availableProducts = category.filter(
      (product: any) => product.isAvailable,
    );
    return availableProducts;
  },

  filterByRating: (category: Product[]) => {
    const fromHighRate = category.flatMap((item: any) => item.ratings);
    fromHighRate.sort((low: any, high: any) => high - low);

    return fromHighRate;
  },
};
