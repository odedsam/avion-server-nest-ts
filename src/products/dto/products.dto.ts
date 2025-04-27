import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class SortOptionDto {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}

export class FilterOptionDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  brands?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  materials?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  priceRanges?: string[];

}

export class ProductsQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SortOptionDto)
  sort?: SortOptionDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterOptionDto)
  filters?: FilterOptionDto;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
