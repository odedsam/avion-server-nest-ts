import { IsOptional, IsString, IsArray, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

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

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  priceRanges?: string[];

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  brands?: string[];

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  materials?: string[];
}
