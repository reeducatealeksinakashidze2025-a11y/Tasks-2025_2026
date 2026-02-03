import { BadRequestException, Injectable } from '@nestjs/common';
import { SingUpDto } from './dto/sing-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schema/users.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { SingInDto } from './dto/sing-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private userModel: Model<User>,
private jwtService:JwtService
) {}

  async singUp(singUpDto: SingUpDto) {
    const existUser = await this.userModel.findOne({ email: singUpDto.email });
    if (existUser) throw new BadRequestException('User alredy exist');

    const hashedOassword = await bcrypt.hash(singUpDto.password, 10);
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    await this.userModel.create({
      firstName: singUpDto.firstName,
      lastName: singUpDto.lastName,
      phoneNumber: singUpDto.phoneNumber,
      email: singUpDto.email,
      gender: singUpDto.gender,
      role:singUpDto.role,
      password: hashedOassword,
      subscriptionStartDate: startDate,
      subscriptionEndDate: endDate,
    });
    return 'User create successful';
  }

  async singIn(singInDto: SingInDto) {
    const existUser = await this.userModel
      .findOne({ email: singInDto.email })
      .select('+password');
    //   .select('+password');

    if (!existUser) throw new BadRequestException('invalid Credentials');

    const isPassEqual = await bcrypt.compare(
      singInDto.password,
      existUser.password,
    );
    if (!isPassEqual) throw new BadRequestException('invalid Credentials');

    const payload={
        userId:existUser._id,
        role:existUser.role
    }
    var token =await this.jwtService.sign(payload, {expiresIn:'1h'})
    return token;
  }

  async currentUser(userId){
    const user =await this.userModel.findById(userId)
    return user
  }
}
