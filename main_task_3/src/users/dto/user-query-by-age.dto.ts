import { Type } from 'class-transformer';
import {  IsOptional } from 'class-validator';

export class UserQueryByAgeDto {
  @Type(() => Number)
  @IsOptional()
  age?: number;
  @Type(() => Number)
  @IsOptional()
  ageFrom?: number;
  @Type(() => Number)
  @IsOptional()
  ageTo?: number;
}
