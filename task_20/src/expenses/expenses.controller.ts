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
import { UserRole } from 'src/decorators/user-roles.decorator';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  getAllExpenses(@Query(new ExpenseQueryPapi()) query: ExpenseQueryDto) {
    return this.expensesService.getAllExpenses(query);
  }

  @Get('statistic')
  getStatistic (){
    return this.expensesService.getStatistic();
  }
  @Get('top-spenders')
  getTopSpender (@Query('limit') limit: number){
    return this.expensesService.getTopSpender(Number(limit));
  }

  @Get(':id')
  getExpenseByid(@Param() { id }: IsValidObjectId) {
    return this.expensesService.getExpenseById(id);
  }

 @UseGuards(IsAuthGuard)
  @Post()
  createExpense(
    @Body(new CreateExpensePipe()) body: CreateExpenseDto,
    @UserId() userId,
  ) {
    console.log(body);
    return this.expensesService.createExpense(body, userId);
  }

 @UseGuards(IsAuthGuard)
   @Patch(':id')
  updateExpense(
    @Param() { id }: IsValidObjectId,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @UserId() userId,
    @UserRole() role

  ) {
    console.log(updateExpenseDto);
    return this.expensesService.updateExpense(id, updateExpenseDto, userId,role);
  }

 @UseGuards(IsAuthGuard)
  @Delete(':id')
  deleteUserById(
    @Param() { id }: IsValidObjectId,
     @UserId() userId,
    @UserRole() role

    ) {
    return this.expensesService.deleteExpense(id, userId, role);
  }
}
