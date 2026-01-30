import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpensePipe } from './pipes/create-expense.pipe';
import { ExpenseQueryPapi } from './pipes/expenses-query.pipe';
import { ExpenseQueryDto } from './dto/expense-query.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { IsAuthGuard } from 'src/guards/is-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getAllExpenses(@Query(new ExpenseQueryPapi()) query: ExpenseQueryDto) {
    return this.expensesService.getAllExpenses(query);
  }

  @Get(':id')
  getExpenseByid(@Param() { id }: IsValidObjectId) {
    return this.expensesService.getExpenseById(id);
  }

  @Post()
  @UseGuards(IsAuthGuard)
  createExpense(
    @Body(new CreateExpensePipe()) body: CreateExpenseDto,
    @UserId() userId,
  ) {
    console.log(body);
    return this.expensesService.createExpense(body, userId);
  }

  @Patch(':id')
  @UseGuards(IsAuthGuard)
  updateExpense(
    @Param() { id }: IsValidObjectId,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @UserId() userId,
  ) {
    console.log(updateExpenseDto);
    return this.expensesService.updateExpense(id, updateExpenseDto, userId);
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard)
  deleteUserById(@Param() { id }: IsValidObjectId, @UserId() userId) {
    return this.expensesService.deleteExpense(id, userId);
  }
}
