import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserQueryDto } from './dto/user-query.dto';
import { UserQueryByAgeDto } from './dto/user-query-by-age.dto';
import { faker } from '@faker-js/faker';
import { Gender } from 'src/common/enums/gender.enum';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    const usersCount = await this.userModel.countDocuments();
    // const dataToInsert: User[] = [];
    if (usersCount < 20) {
      const dataToInsert: Partial<User>[] = [];

      const genders = Object.values(Gender);
      for (let i = 0; i < 500000; i++) {
        dataToInsert.push({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          phoneNumber: faker.phone.number(),
          gender: genders[Math.floor(Math.random() * genders.length)],
          age: faker.number.int({ min: 15, max: 90 }),
        });
      }
        let BATCH_SIZE = 10_000;
        for (let i = 0; i < dataToInsert.length; i += BATCH_SIZE) {
          const data = dataToInsert.slice(i, BATCH_SIZE + i);
          await this.userModel.insertMany(data);
          console.log('inserted:', i);
        }
      
    }
   
  }
  async create(dto: CreateUserDto) {
    const existUser = await this.userModel.exists({ email: dto.email });
    if (existUser) {
      throw new BadRequestException('User already exists');
    }

    const subscriptionStartDate = new Date();
    const subscriptionEndDate = new Date(subscriptionStartDate);
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    const user = await this.userModel.create({
      ...dto,
      subscriptionStartDate,
      subscriptionEndDate,
    });

    return user;
  }

  async findAll(query: UserQueryDto) {
    console.log(query);
    let users = this.userModel.find();

    if (query.gender) {
      users = users.where('gender').equals(query.gender);
    }

    if (query.firstName) {
      users = users
        .where('firstName')
        .regex(new RegExp(`^${query.firstName}`, 'i'));
    }
    return users.skip((query.page - 1) * query.take).limit(query.take);
  }
  findAllByAge(query: UserQueryByAgeDto) {
    let users = this.userModel.find()
    //.explain();

    if (query.age) users = users.where('age').equals(query.age);
    if (query.ageFrom) {
      users = users.where('age').gte(query.ageFrom);
    }
    if (query.ageTo) {
      users = users.where('age').lte(query.ageTo);
    }
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async totalUsers() {
    return this.userModel.countDocuments();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    if (!updatedUser) throw new NotFoundException('user not found');
    return updateUserDto;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }
}
