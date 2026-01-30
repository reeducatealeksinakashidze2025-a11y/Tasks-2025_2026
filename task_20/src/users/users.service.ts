import {
  BadRequestException,
  // forwardRef,
  HttpException,
  HttpStatus,
  // Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import mongoose, { Model } from 'mongoose';
// import { ExpensesService } from 'src/expenses/expenses.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    // @Inject(forwardRef(()=> ExpensesService))
    // private expensesService:ExpensesService
  ) {}

  async getAllUsers({ page, take, gender, email }: UserQueryDto) {
    let query = this.userModel
      .find()
      .populate({ path: 'expenses', select: '-user' });
    if (gender) {
      query = query.where('gender').equals(gender);
    }

    if (email) {
      query = query.where('email').regex(new RegExp(`^${email}`, 'i'));
    }
    return query.skip((page - 1) * take).limit(take);
  }

  // async createUser({
  //   firstName,
  //   lastName,
  //   email,
  //   phoneNumber,
  //   gender,
  // }: CreateUserDto) {
  //   if (!firstName || !lastName || !email)
  //     throw new HttpException(
  //       'firstName, lastName and email is required',
  //       HttpStatus.BAD_REQUEST,
  //     );

  //   const existUser = await this.userModel.findOne({ email });
  //   if (existUser) throw new BadRequestException('user alredy exist');

  //   const startDate = new Date();
  //   const endDate = new Date(startDate);
  //   endDate.setMonth(endDate.getMonth() + 1);
  //   const newUser = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email,
  //     phoneNumber: phoneNumber,
  //     gender: gender,
  //     subscriptionStartDate: startDate,
  //     subscriptionEndDate: endDate,
  //   };
  //   this.userModel.create(newUser);
  //   return newUser;
  // }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
  async deleteUserById(userId: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }

  async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );

    if (!updatedUser) throw new NotFoundException('user not found');

    return updateUserDto;
  }

  async upgradeSubscription(id: string) {
    const existUser = await this.userModel.findById(id).exec();

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    const now = new Date();

    if (existUser.subscriptionStartDate && existUser.subscriptionEndDate) {
      if (
        now >= existUser.subscriptionStartDate &&
        now <= existUser.subscriptionEndDate
      ) {
        throw new HttpException(
          'user has subscription',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else
      throw new HttpException(
        'user cannot continue subscription',
        HttpStatus.BAD_REQUEST,
      );

    console.log(existUser);
    const subscriptionStartDate = new Date();
    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { subscriptionStartDate, subscriptionEndDate },
        { new: true },
      )
      .exec();
    console.log('subscription updatedUser:' + updatedUser);
    return true;
  }

  async addExpenseToUser(expenseId, userId) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { expenses: expenseId } },
      { new: true },
    );
    return updatedUser;
  }
}
