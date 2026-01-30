import { IsEnum, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { knowCategories } from '../enums/expense-category.enum';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsNumber()
  @IsEnum(knowCategories)
  category?: knowCategories;
  @IsNotEmpty()
  @IsString()
  productName: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  @IsNotEmpty()
  @IsNumber()
  price: number;

  // totalPrice: number;
}
