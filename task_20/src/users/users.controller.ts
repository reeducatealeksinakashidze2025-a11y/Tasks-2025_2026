import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { UserQueryPipe } from './pipes/user-query.pipe';
import { UserQueryDto } from './dto/user-query.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(@Query(/*new UserQueryPipe()*/) query: UserQueryDto) {
    console.log(query);
    return this.usersService.getAllUsers(query);
  }

  @Get("byGender")
  getByGender(){
    return this.usersService.getByGender()
  }

  // @Post()
  // createUser(@Body(new CreateUserPipe()) createUserDto:CreateUserDto){
  //     return this.usersService.createUser(createUserDto)
  // }

  @Get(':id')
  getUserById(@Param() { id }: IsValidObjectId) {
    return this.usersService.getUserById(id);
  }

    @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteUserById(@Param() { id }: IsValidObjectId) {
    return this.usersService.deleteUserById(id);
  }

   @Roles('admin')
  @UseGuards(RolesGuard)
  @Patch(':id')
  updateUserById(
    @Param() { id }: IsValidObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Get('upgrade-subscription/:id')
  upgradeSubscription(@Param() { id }: IsValidObjectId) {
    return this.usersService.upgradeSubscription(id);
  }
}
