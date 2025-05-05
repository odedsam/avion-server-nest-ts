import { IsOptional, IsString, IsArray, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';


export enum ProductCategory {
  PLANTS = 'plants',
  CHAIRS = 'chairs',
  CERAMICS = 'ceramics',
  LIGHTS = 'lights',
  TABLES = 'tables',
}

export class ProductsQueryDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ? value.toLowerCase() : value)
  @IsIn(Object.values(ProductCategory))
  category?: ProductCategory;

  @IsOptional()
  @IsIn([
    'price-asc',
    'price-desc',
    'name',
    'availability',
    'rating',
    'height',
    'depth',
  ])
  sort?: string;

  offset?: number;
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  priceRanges?: string[];
}
