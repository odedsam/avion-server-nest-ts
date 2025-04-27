import type { Product } from '../types';

export const filterFunctions = {
  filterByBrand: (products: Product[]): { key: string; count: number }[] => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return Object.entries(counts).map(([key, count]) => ({ key, count }));
  },

  filterByPriceRange: (products: Product[]) => {
    const ranges = ['1-99', '100-199', '200-299', '300-399'];
    return ranges.map((range) => {
      const [min, max] = range.split('-').map(Number);
      const count = products.filter((p) => p.productPrice >= min && p.productPrice <= max).length;
      return { range, count };
    });
  },

  filterByTags: (products: Product[]): { key: string; count: number }[] => {
    const tagCounts: Record<string, number> = {};
    products.forEach((p) =>
      (p.tags || []).forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }),
    );
    return Object.entries(tagCounts).map(([key, count]) => ({ key, count }));
  },

  filterByMaterial: (products: Product[]): { key: string; count: number }[] => {
    const materialCounts: Record<string, number> = {};
    products.forEach((p) => {
      if (p.material) {
        materialCounts[p.material] = (materialCounts[p.material] || 0) + 1;
      }
    });
    return Object.entries(materialCounts).map(([key, count]) => ({ key, count }));
  },

  filterByColors: (products: Product[]): { key: string; count: number }[] => {
    const colorCounts: Record<string, number> = {};
    products.forEach((p) =>
      (p.colors || []).forEach((color) => {
        colorCounts[color] = (colorCounts[color] || 0) + 1;
      }),
    );
    return Object.entries(colorCounts).map(([key, count]) => ({ key, count }));
  },

  filterByStock: (products: Product[]): Product[] => {
    return [...products].sort((a, b) => b.stock - a.stock);
  },

  filterByAvailability: (products: Product[]): Product[] => {
    return products.filter((p) => p.isAvailable);
  },

  filterByRating: (products: Product[]): { key: number; count: number }[] => {
    const ratings: Record<number, number> = {};
    products.forEach((p) => {
      const rate = p.ratings || 0;
      ratings[rate] = (ratings[rate] || 0) + 1;
    });
    return Object.entries(ratings).map(([key, count]) => ({
      key: Number(key),
      count,
    }));
  },
};
