import { Type } from "class-transformer";
import { IsEnum, IsIn, IsOptional, Min } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { knowCategories } from "../enums/expense-category.enum";

export class ExpenseQueryDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsEnum(knowCategories)
  category?: knowCategories;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  priceFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  priceTo?: number;
}