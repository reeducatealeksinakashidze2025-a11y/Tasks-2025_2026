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
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expenses.name) private expenseModel: Model<Expenses>,
    @InjectModel('User') private userModel: Model<User>,
    private usersService: UsersService,
  ) {}

  getAllExpenses({
    page,
    take,
    category,
    priceFrom,
    priceTo,
  }: ExpenseQueryDto) {
    let query = this.expenseModel.find().populate({
      path: 'user',
      select: 'email',
    });
    if (category) query = query.where('category').equals(category);
    if (priceFrom) {
      query = query.where('price').gte(priceFrom);
    }
    if (priceTo) {
      query = query.where('price').lte(priceTo);
    }
    return query.skip((page - 1) * take).limit(take);
  }

  async getStatistic() {
    console.log('shemovida');
    return this.expenseModel.aggregate([
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$totalPrice' },
          quantity: { $sum: '$quantity' },
          counte: { $sum: 1 },
          // fullname: { $first: '$productName' }
        },
      },
    ]);
  }

  async getTopSpender(limit: number) {
    console.log('shemovida');
    // return this.expenseModel.aggregate([
    //   {
    //     $group: {
    //       _id: '$user',
    //       totalAmount: { $sum: '$totalPrice' },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: '_id',
    //       foreignField: '_id',
    //       as: 'users',
    //     },
    //   },
    //    { $unwind: '$users' },
    //      { $sort: { totalAmount: -1 } },
    //   { $limit: limit },
    //   {
    //     $project: {
    //        _id: 0,
    //       fullname: {
    //         $concat: [
    //           { $arrayElemAt: ['$user.firstName', 0] },
    //           ' ',
    //           { $arrayElemAt: ['$user.lastName', 0] },
    //         ],
    //       },
    //       totalAmount: 1,
    //     },
    //   },
    // ]);
    return this.expenseModel.aggregate([
      {
        $group: {
          _id: '$user',
          totalAmount: { $sum: '$totalPrice' },
        },
      },
      // {
      //   $lookup: {
      //     from: 'users',
      //     localField: '_id',
      //     foreignField: '_id',
      //     as: 'user',
      //   },
      // },
      {
        $lookup: {
          from: 'users',
          let: { userId: { $toObjectId: '$_id' } },
          pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$userId'] } } }],
          as: 'user',
        },
      },

       { $unwind: '$user' },
       { $limit: limit },
      {
        $project: {
          _id: 0,
          fullname: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
          totalAmount: 1,
        },
      },
    ]);
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
    role,
  ) {
    const expense = await this.expenseModel.findById(id).exec();
    if (!expense) throw new NotFoundException('expense not found');
    if (expense.user !== userId && role !== Role.ADMIN)
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
  async deleteExpense(id: string, userId, role) {
    console.log('roleeeeeeeeeeeeebi', role);
    const existExpense = await this.expenseModel.findById(id);
    if (!existExpense) throw new NotFoundException('expense not found');
    if (existExpense.user !== userId && role !== Role.ADMIN)
      throw new UnauthorizedException('permition denied');
    const deletedExpense = await this.expenseModel.findByIdAndDelete(id);
    if (!deletedExpense) throw new NotFoundException('expense not found');

    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { expenses: deletedExpense?._id },
    });
    return deletedExpense;
  }
}
