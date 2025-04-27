import { ProductEntity } from '../entities/product.entity';
import { Product } from '../schemas/product.schema';

export const toProductEntity = (product: Product): ProductEntity => ({
  id: product.id,
  name: product.name,
  slug: product.slug,
  brand: product.brand,
  productImage: product.productImage,
  productTitle: product.productTitle,
  productPrice: product.productPrice,
  category: product.category,
  material: product.material,
  isAvailable: product.isAvailable,
  stock: product.stock,
  ratings: product.ratings,
  tags: product.tags,
  colors: product.colors,
  shipping: product.shipping,
  productDescription: product.productDescription,
  productDimensions: product.productDimensions,
});
