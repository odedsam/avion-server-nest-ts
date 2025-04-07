import { AllProducts } from '../api/data';

export const buildCategoryIndex = (allProducts: any[]) => {
  const categoryIndex = new Map<string, any[]>();

  allProducts.flatMap((categoryProducts) =>
    categoryProducts.forEach((product) => {
      const category = product.category;
      if (!categoryIndex.has(category)) {
        categoryIndex.set(category, []);
      }
      categoryIndex.get(category)?.push(product);
    }),
  );

  return categoryIndex;
};

export const categoryIndex = buildCategoryIndex(AllProducts);
export const getProductByCategory = (cat: string) => {
  return categoryIndex.get(cat) || [];
};

export const getAllCategories = (offset, limit) => {
  const allOptions = AllProducts.flatMap((item) => [...item]).slice(offset, limit);
  return allOptions;
};
