import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Gender } from 'src/common/enums/gender.enum';

export class SingUpDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsPhoneNumber('GE')
  phoneNumber: string;
  @IsEnum(Gender)
  gender: Gender;
  @IsString()
  @IsNotEmpty()
 @Length(6,10)
  password: string;
}
