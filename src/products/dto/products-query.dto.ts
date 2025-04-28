import { IsOptional, IsString, IsArray, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductsQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

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
  offset?:number;
  limit?:number;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  priceRanges?: string[];
}
