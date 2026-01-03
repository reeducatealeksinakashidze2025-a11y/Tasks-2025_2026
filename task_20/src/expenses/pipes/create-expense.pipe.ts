import { ArgumentMetadata, BadRequestException, HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { CreateExpenseDto } from "../dto/create-expense.dto";
import { knowCategories } from "../enums/expense-category.enum";
@Injectable()
export class CreateExpensePipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata):CreateExpenseDto {
        if(!value) throw new BadRequestException('body is empty')
        if('category' in value && !Object.values(knowCategories).includes(value.category))
            throw new BadRequestException('Provaider supported categories')

        if('price' in value && isNaN(value.price))
            throw new BadRequestException('Please provide valid price')
        if('price' in value )
            value.price=Number(value.price)
        return value
    }
}