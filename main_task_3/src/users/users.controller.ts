import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { UserQueryByAgeDto } from './dto/user-query-by-age.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAll(query);
  }
  @Get('by-age')
  findAllByAge(@Query() query: UserQueryByAgeDto) {
    console.log('find by age',query)
    return this.usersService.findAllByAge(query);
  }

  @Get('total-users')
  totalUsers() {
    return this.usersService.totalUsers();
  }

  @Get(':id')
  findOne(@Param() { id }: IsValidObjectId) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: IsValidObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() { id }: IsValidObjectId) {
    return this.usersService.remove(id);
  }
}
