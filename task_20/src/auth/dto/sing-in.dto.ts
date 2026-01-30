import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SingInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 10)
  password: string;
}
