import { Product } from '../types/Product';

export const filterFunctions = {
  filterByBrand: (category: Product[]) => {
    const brands = new Set(category.map((item) => item.brand));
    return brands;
  },
  filterByPriceRange: (
    category: Product[],
  ): Record<string, Product[]> | { message: string[] } => {
    if (!category.length) return { message: ['No products available'] };

    const priceRanges = {
      '1-99': category.filter(
        (item) => item.productPrice >= 1 && item.productPrice <= 99,
      ),
      '100-199': category.filter(
        (item) => item.productPrice >= 100 && item.productPrice <= 199,
      ),
      '200-299': category.filter(
        (item) => item.productPrice >= 200 && item.productPrice <= 299,
      ),
      '300-399': category.filter(
        (item) => item.productPrice >= 300 && item.productPrice <= 399,
      ),
    };

    // Return filtered products by price ranges
    return priceRanges;
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
    const colorCounts: Record<string, number> = {};
    category.forEach((item: any) => {
      if (!item.colors) return;
      item.colors.forEach((color: string) => {
        colorCounts[color] = (colorCounts[color] || 0) + 1;
      });
    });
    return colorCounts;
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
