import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { AllProducts, categories } from 'src/api/Products/AllProducts';
import { filterFunctions } from 'src/utils/filter';
import { CategoryDto } from './dto/products.dto';
const {filterByBrand,filterByAvailability,filterByTags,filterByColors,filterByRating,filterByMaterial,filterByPriceRange,filterByStock} = filterFunctions;

interface ProductCategoryResponse {
  categoryData: any[] | any;
  categoryMetaData: any[] | any;
}

const metricTransformer = (vibrant: any) => {
  !Array.isArray(vibrant) ? Array.from([vibrant]) : vibrant;
  return vibrant.length;
};

// filterByColors(categoryFilters),
@Injectable()
export class ProductsService {
  private readonly products = AllProducts;
  private readonly categories = categories;

  getAllProducts(): any[] {
    return this.products.flat().slice(0, 20);
  }

  categoryMetaData(categoryFilters: any | any[]): any[] | any {
    const metaData = {
      brands: {
        metrics: metricTransformer(filterByBrand(categoryFilters)),
        results: filterByBrand(categoryFilters),
      },
      avail: {
        metrics: metricTransformer(filterByAvailability(categoryFilters)),
        results: filterByAvailability(categoryFilters),
      },
      tags: {
        metrics: metricTransformer(filterByTags(categoryFilters)),
        results: filterByTags(categoryFilters),
      },
      ratings: {
        metrics: metricTransformer(filterByRating(categoryFilters)),
        results: filterByRating(categoryFilters),
      },
      materials: {
        metrics: metricTransformer(filterByMaterial(categoryFilters)),
        results: filterByMaterial(categoryFilters),
      },
      colors: {
        metrics: metricTransformer(filterByColors(categoryFilters)),
        results: filterByColors(categoryFilters),
      },
      price: {
        metrics: metricTransformer(categoryFilters),
        results: filterByPriceRange(categoryFilters),
      },
      stocks: {
        metrics: metricTransformer(filterByStock(categoryFilters)),
        results: filterByStock(categoryFilters),
      },
    };
    return metaData;
  }

  getProductByCategory(categoryDto: CategoryDto) {
    if (!categoryDto.category) {
      return this.getAllProducts();
    }
    const category = categoryDto.category.toLowerCase();
    if (!this.categories[category]) {
      throw new NotFoundException(`Category ${category} not found`);
    }

    const productCategoryResponse = this.categories[category];
    // return {
    //   categoryData: productCategoryResponse,
    //   MetaData: this.categoryMetaData(productCategoryResponse),
    // };

    // פונקציה לספירה לפי שדה
    const countByField = (data: any[], field: string, topN: number = 5) => {
      const counts = data.reduce((acc: Record<string, number>, item) => {
        const fieldValue = item[field];

        if (Array.isArray(fieldValue)) {
          // אם הערך הוא מערך, לעבור על כל אחד
          fieldValue.forEach((value) => {
            acc[value] = (acc[value] || 0) + 1;
          });
        } else {
          // אם הערך הוא מחרוזת או מספר
          acc[fieldValue] = (acc[fieldValue] || 0) + 1;
        }

        return acc;
      }, {});

      // להחזיר את התוצאה ללא מיון
      return Object.entries(counts)
        .slice(0, topN) // לקחת את N הראשונים אם יש הגבלה
        .map(([key, count]) => ({ key, count })); // לחזור לפורמט קריא
    };

    // ניתוח נתונים לפי השדות המבוקשים
    const topBrands = countByField(productCategoryResponse, 'brand');
    const topColors = countByField(productCategoryResponse, 'colors');
    const topMaterials = countByField(productCategoryResponse, 'material');

    // החזרת הנתונים
    return {
      // categoryData: productCategoryResponse,
      MetaData: {
        topBrands,
        topColors,
        topMaterials,
      },
    };
  }
}
