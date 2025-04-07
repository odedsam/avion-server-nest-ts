import { IsString, IsNumber, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsNumber()
  productPrice: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  ratings: number;

  @IsString()
  material: string;

  @IsArray()
  @IsString({ each: true })
  colors: string[];

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsBoolean()
  isAvailable: boolean;
}
