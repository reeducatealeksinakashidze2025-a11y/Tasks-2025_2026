import {  Transform, Type } from "class-transformer";
import {  IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { Gender } from "src/common/enums/gender.enum";

export class UserQueryDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => {
  const mapping = { m: Gender.Male, f: Gender.Female, o: Gender.Other };
  return mapping[value?.toLowerCase()];
})
@IsEnum(Gender)
  gender?: Gender;

   @IsOptional()
  firstName?: string;
}