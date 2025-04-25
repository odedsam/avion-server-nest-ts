@Injectable()
export class ProductsService {
  private readonly products: Product[][] = AllProducts;
  private readonly categories = categories;

  constructor(private readonly config: ConfigService) {}

  getFilteredProducts(query: ProductsQueryDto) {
    const baseProducts = this.resolveBaseProducts(query.category);
    const filtersMeta = this.buildFiltersMeta(baseProducts);
    const filtered = this.applyFilters(baseProducts, query.priceRanges);
    const sorted = this.applySort(filtered, query.sort);

    const supabaseUrlBuilder = getSupabaseImageUrl(this.config);
    const products = sorted.map((product) => ({
      ...product,
      productImage: supabaseUrlBuilder(product.productImage),
    }));

    return {
      products: products.slice(0, 30),
      filtersMeta,
    };
  }

  private resolveBaseProducts(category?: string): Product[] {
    if (!category) return this.products.flat();

    const key = category.toLowerCase();
    const exists = this.categories[key];
    if (!exists) throw new NotFoundException(`Category "${key}" not found`);

    return exists;
  }

  private buildFiltersMeta(products: Product[]) {
    return {
      priceRanges: this.countPriceRanges(products),
      colors: this.countByField(products, 'colors'),
      brands: this.countByField(products, 'brand'),
      materials: this.countByField(products, 'material'),
    };
  }

  private applyFilters(products: Product[], ranges?: string[]): Product[] {
    if (!ranges?.length) return products;

    return products.filter((p) =>
      ranges.some((range) => {
        const [min, max] = range.split('-').map(Number);
        return p.productPrice >= min && p.productPrice <= max;
      }),
    );
  }

  private applySort(products: Product[], sort?: string): Product[] {
    const map: Record<string, keyof typeof sortFunctions> = {
      'price-desc': 'sortByHighPrice',
      'price-asc': 'sortByLowPrice',
      name: 'sortByName',
      availability: 'sortByAvailability',
      rating: 'sortByRating',
      height: 'sortByHeight',
      depth: 'sortByDepth',
    };

    const fn = map[sort ?? ''];
    return fn ? sortFunctions[fn](products) : products;
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

    for (const p of products) {
      const value = p[field];

      if (Array.isArray(value)) {
        for (const v of value) {
          counts[v] = (counts[v] || 0) + 1;
        }
      } else if (typeof value === 'string') {
        counts[value] = (counts[value] || 0) + 1;
      }
    }

    return Object.entries(counts).map(([key, count]) => ({ key, count }));
  }
}
