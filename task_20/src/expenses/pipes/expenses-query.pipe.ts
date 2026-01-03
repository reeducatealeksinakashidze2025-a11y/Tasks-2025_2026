import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ExpenseQueryDto } from '../dto/expense-query.dto';
import { knowCategories } from '../enums/expense-category.enum';

export class ExpenseQueryPapi implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata):ExpenseQueryDto {
    console.log(value)
    if (value.category !== undefined  && !Object.values(knowCategories).includes(value.category))
      throw new BadRequestException('Category not present');

    if (value.priceFrom !== undefined && isNaN(value.priceFrom))
      throw new BadRequestException('Wrong priceFrom provided');
    if (value.priceFrom !== undefined) value.priceFrom = Number(value.priceFrom);
    if ( value.priceTo !== undefined  && isNaN(value.priceTo))
      throw new BadRequestException('Wrong priceTo provided');
    if ( value.priceTo !== undefined ) value.priceTo = Number(value.priceTo);
    return value;
  }
}
