import { Transform, Type } from "class-transformer";
import { IsEmail, IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { Gender } from "src/common/enums/gender.enum";

export class UserQueryDto extends PaginationDto {
  @IsOptional()
//   @Transform(({ value }) => {
//   const mapping = { m: 1, f: 2, o: 3 };
//   return mapping[value?.toLowerCase()];
// })
@Type(() => Number)
@IsEnum(Gender)
  gender?: Gender;

   @IsOptional()
  email?: string;
}