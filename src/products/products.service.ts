import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllProducts, categories } from 'src/api/data';
import { ProductsQueryDto } from './dto/products-query.dto';
import { Product } from 'src/types/product';
import { sortFunctions } from 'src/utils/sort';
import { getSupabaseImageUrl } from 'src/utils/getSupabaseImageUrl';

@Injectable()
export class ProductsService {
  private readonly products: Product[][] = AllProducts;
  private readonly categories = categories;

  constructor(private readonly config: ConfigService) {}

  getFilteredProducts(query: ProductsQueryDto) {
    const { category, sort, priceRanges } = query;

    let baseProducts = this.products.flat();

    if (category) {
      const lower = category.toLowerCase();
      if (!this.categories[lower]) {
        throw new NotFoundException(`Category ${lower} not found`);
      }
      baseProducts = this.categories[lower];
    }

    const filtersMeta = {
      priceRanges: this.countPriceRanges(baseProducts),
      colors: this.countByField(baseProducts, 'colors'),
      brands: this.countByField(baseProducts, 'brand'),
      materials: this.countByField(baseProducts, 'material'),
    };

    let filtered = [...baseProducts];

    if (priceRanges?.length) {
      filtered = filtered.filter((p) =>
        priceRanges.some((range) => {
          const [min, max] = range.split('-').map(Number);
          return p.productPrice >= min && p.productPrice <= max;
        }),
      );
    }

    const sortMap: Record<string, keyof typeof sortFunctions> = {
      'price-desc': 'sortByHighPrice',
      'price-asc': 'sortByLowPrice',
      name: 'sortByName',
      availability: 'sortByAvailability',
      rating: 'sortByRating',
      height: 'sortByHeight',
      depth: 'sortByDepth',
    };

    if (sort && sortMap[sort]) {
      filtered = sortFunctions[sortMap[sort]](filtered);
    }

    const supabaseUrlBuilder = getSupabaseImageUrl(this.config);

    const productsWithImageUrls = filtered.map((product) => ({
      ...product,
      productImage: supabaseUrlBuilder(product.productImage),
    }));

    return {
      products: productsWithImageUrls.slice(0, 30),
      filtersMeta,
    };
  }

  private countPriceRanges(products: Product[]) {
    const ranges = ['1-99', '100-199', '200-299', '300-399'];

    return ranges.map((range) => {
      const [min, max] = range.split('-').map(Number);
      const count = products.filter((p) => p.productPrice >= min && p.productPrice <= max).length;
      return { range, count };
    });
  }

  private countByField(products: Product[], field: keyof Product) {
    const counts: Record<string, number> = {};

    products.forEach((p) => {
      const value = p[field];

      if (Array.isArray(value)) {
        value.forEach((v) => {
          counts[v] = (counts[v] || 0) + 1;
        });
      } else if (typeof value === 'string') {
        counts[value] = (counts[value] || 0) + 1;
      }
    });

    return Object.entries(counts).map(([key, count]) => ({ key, count }));
  }
}
