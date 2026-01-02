import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { throws } from 'assert';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      id: 1,
      category: 1,
      productName: 'Laptop',
      quantity: 2,
      price: 2500,
      totalPrice: 5000,
    },
    {
      id: 2,
      category: 2,
      productName: 'Mouse',
      quantity: 5,
      price: 50,
      totalPrice: 250,
    },
    {
      id: 3,
      category: 3,
      productName: 'Office Chair',
      quantity: 1,
      price: 800,
      totalPrice: 800,
    },
  ];

  getAllExpenses() {
    return this.expenses;
  }

  getExpenseById(id: number) {
    const expense = this.expenses.find((e) => e.id === id);
    if (!expense) throw new NotFoundException('expense not found');
    return expense;
  }

  createExpense({
    category,
    productName,
    quantity,
    price
  }: CreateExpenseDto) {
    if (!category || !productName || !quantity || !price)
      throw new HttpException('all fild is required', HttpStatus.BAD_REQUEST);
    const lastIndex = this.expenses[this.expenses.length - 1]?.id || 0;
    const newExpense = {
      id: lastIndex + 1,
      category: category,
      productName: productName,
      quantity: quantity,
      price: price,
      totalPrice: quantity * price,
    };

    this.expenses.push(newExpense);
    return newExpense;
  }
  updateExpense(
    id: number,
    { category, productName, quantity, price }: UpdateExpenseDto,
  ) {
    const expenseIndex = this.expenses.findIndex((e) => e.id === id);
    if (expenseIndex === -1) throw new NotFoundException('expense not found');

    const currentExpense = this.expenses[expenseIndex];

    const expenseReq = {};
    if (category) expenseReq['category'] = category;
    if (productName) expenseReq['productName'] = productName;
    if (quantity) expenseReq['quantity'] = quantity;
    if (price) expenseReq['price'] = price;
    if (quantity || price)
      expenseReq['totalPrice'] =
        (quantity ?? currentExpense.quantity) * (price ?? currentExpense.price);

    this.expenses[expenseIndex] = {
      ...this.expenses[expenseIndex],
      ...expenseReq,
    };

    return this.expenses[expenseIndex];
  }
  deleteExpense(id: number) {
    const expenseIndex = this.expenses.findIndex((e) => e.id === id);
    if (expenseIndex === -1) throw new NotFoundException('expense not found');

    const deletedExpense = this.expenses.splice(expenseIndex, 1);
    return deletedExpense;
  }
}
