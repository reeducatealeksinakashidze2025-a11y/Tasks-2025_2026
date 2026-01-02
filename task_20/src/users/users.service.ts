import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      firstName: 'nika',
      lastName: 'daraxvelidze',
      email: 'al@gmail.com',
      phoneNumber: '595123456',
      gender: 1,
    },
    {
      id: 2,
      firstName: 'mzia',
      lastName: 'daraxvelidze',
      email: 'all@gmail.com',
      phoneNumber: '595123456',
      gender: 2,
    },
  ];

  getAllUsers() {
    return this.users;
  }

  createUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
  }): CreateUserDto {
    if (!firstName || !lastName || !email )
      throw new HttpException(
        'firstName, lastName and email is required',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      gender: gender,
    };
    this.users.push(newUser);
    return newUser;
  }

  getUserById(userId: number) {
    const user = this.users.find((o) => o.id === userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  deleteUserById(userId: number) {
    const userIndex = this.users.findIndex((o) => o.id === userId);
    if (userIndex === -1) throw new NotFoundException('User not found');
    const [deletedUser] = this.users.splice(userIndex, 1);
    return deletedUser;
  }

  updateUserById(userId: number, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((o) => o.id === userId);
    if (userIndex === -1) throw new NotFoundException('User not found');
    const updateReq = {};
    if (updateUserDto.firstName) updateReq['firstName'] = updateUserDto.firstName;
    if (updateUserDto.lastName) updateReq['lastName'] = updateUserDto.lastName;
    if (updateUserDto.email) updateReq['email'] = updateUserDto.email;
    if (updateUserDto.phoneNumber) updateReq['phoneNumber'] = updateUserDto.phoneNumber;
    if (updateUserDto.gender) updateReq['gender'] = updateUserDto.gender;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateReq,
    };

    return this.users[userIndex];
  }
}
