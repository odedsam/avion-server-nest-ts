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
