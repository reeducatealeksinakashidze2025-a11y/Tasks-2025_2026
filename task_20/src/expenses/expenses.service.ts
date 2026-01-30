import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseQueryDto } from './dto/expense-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expenses } from './schema/expenses.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expenses.name) private expenseModel: Model<Expenses>,
    @InjectModel('user') private userModel: Model<User>,
    private usersService: UsersService,
  ) {}

  getAllExpenses({
    page,
    take,
    category,
    priceFrom,
    priceTo,
  }: ExpenseQueryDto) {
    let query = this.expenseModel.find();
    if (category) query = query.where('category').equals(category);
    if (priceFrom) {
      query = query.where('price').gte(priceFrom);
    }
    if (priceTo) {
      query = query.where('price').lte(priceTo);
    }
    return query.skip((page - 1) * take).limit(take);
  }

  async getExpenseById(id: string) {
    const expense = await this.expenseModel.findById(id);
    if (!expense) throw new NotFoundException('expense not found');
    return expense;
  }

  async createExpense(
    { category, productName, quantity, price }: CreateExpenseDto,
    userId,
  ) {
    if (!category || !productName || !quantity || !price)
      throw new HttpException('all fild is required', HttpStatus.BAD_REQUEST);
    const newExpense = {
      category: category,
      productName: productName,
      quantity: quantity,
      price: price,
      totalPrice: quantity * price,
      user: userId,
    };

    const result = await this.expenseModel.create(newExpense);
    if (result) await this.usersService.addExpenseToUser(result._id, userId);
    return result;
  }
  async updateExpense(
    id: string,
    { category, productName, quantity, price }: UpdateExpenseDto,
    userId,
  ) {
    const expense = await this.expenseModel.findById(id).exec();
    if (!expense) throw new NotFoundException('expense not found');
    if (expense.user !== userId)
      throw new UnauthorizedException('permition denied');
    const expenseReq = {};
    if (category) expenseReq['category'] = category;
    if (productName) expenseReq['productName'] = productName;
    if (quantity) expenseReq['quantity'] = quantity;
    if (price) expenseReq['price'] = price;
    if (quantity || price)
      expenseReq['totalPrice'] =
        (quantity ?? expense.quantity) * (price ?? expense.price);

    const updatedExpense = await this.expenseModel.findByIdAndUpdate(
      id,
      expenseReq,
      { new: true },
    );

    return updatedExpense;
  }
  async deleteExpense(id: string, userId) {
    const existExpense = await this.expenseModel.findById(id);
    if (!existExpense) throw new NotFoundException('expense not found');
    if (existExpense.user !== userId)
      throw new UnauthorizedException('permition denied');
    const deletedExpense = await this.expenseModel.findByIdAndDelete(id);
    if (!deletedExpense) throw new NotFoundException('expense not found');

    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { expenses: deletedExpense?._id },
    });
    return deletedExpense;
  }
}
