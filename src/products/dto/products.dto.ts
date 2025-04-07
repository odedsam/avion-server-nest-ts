// export class CategoryDto {
//   @IsString()
//   @IsNotEmpty()
//   @IsIn(['ceramics', 'chairs', 'lights', 'plants', 'tables'], {
//     message:'Category must be one of the following: ceramics, chairs, lights, chairs, tables',
//   })
//   category?: string;
//   static fromQuery(query: any): CategoryDto {
//     const dto = new CategoryDto();
//     dto.category = Object.keys(query)[0];
//     return dto;
//   }
// }

import { IsString, IsIn, IsOptional, Min, IsInt, Max } from 'class-validator';
// next formation of all queries
export class CategoryDto {
  @IsString()
  @IsOptional()
  @IsIn(['ceramics', 'chairs', 'lights', 'plants', 'tables'], {
    message: 'Category must be one of the following: ceramics, chairs, lights, plants, tables',
  })
  category?: string;

  @IsInt()
  @IsOptional()
  @Min(0, { message: 'Offset must be 0 or greater' })
  offset?: number;

  @IsInt()
  @IsOptional()
  @Min(1, { message: 'Limit must be 1 or greater' })
  @Max(100, { message: 'Limit must not exceed 100' })
  limit?: number;

  // שליפת הערכים מה-Query String
  static fromQuery(query: any): CategoryDto {
    const dto = new CategoryDto();
    dto.category = Object.keys(query).find((key) => ['ceramics', 'chairs', 'lights', 'plants', 'tables'].includes(key));
    if (query.offset) dto.offset = parseInt(query.offset, 10);
    if (query.limit) dto.limit = parseInt(query.limit, 10);
    return dto;
  }
}
