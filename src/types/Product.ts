export type Product = {
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
  createdAt?: Date;
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
};

export type CategoryMap = {
  [category: string]: Product[];
};

export type ProductWithImage = Product & {
  productImage: string; // transformed to Supabase URL
};

export type FilterFunction = (products: Product[]) => string[] | number[] | Product[];

export type AppMeta = {
  metrics: number;
  results: any[];
};

export type CategoryMetaData = {
  [key: string]: AppMeta;
};

export interface ProductCategoryResponse {
  categoryData: Product[];
  categoryMetaData: CategoryMetaData;
}

export interface TopFieldEntry {
  key: string;
  count: number;
}

export type CountByFieldFn = (data: Product[], field: keyof Product, topN?: number) => TopFieldEntry[];

export interface CategoryDto {
  category?: string;
}
