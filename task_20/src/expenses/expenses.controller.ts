import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpensePipe } from './pipes/create-expense.pipe';
import { ExpenseQueryPapi } from './pipes/expenses-query.pipe';
import { ExpenseQueryDto } from './dto/expense-query.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getAllExpenses(@Query(new ExpenseQueryPapi()) query:ExpenseQueryDto) {
    return this.expensesService.getAllExpenses(query);
  }

  @Get(':id')
  getExpenseByid(@Param() {id}:IsValidObjectId) {
    return this.expensesService.getExpenseById(id);
  }

  @Post()
  createExpense(@Body(new CreateExpensePipe()) body: CreateExpenseDto) {
    console.log(body);
    return this.expensesService.createExpense(body);
  }

  @Patch(':id')
  updateExpense(
    @Param() {id}:IsValidObjectId,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    console.log(updateExpenseDto);
    return this.expensesService.updateExpense(id, updateExpenseDto);
  }

  @Delete(':id')
  deleteUserById(@Param() {id}:IsValidObjectId) {
    return this.expensesService.deleteExpense(id);
  }
}
