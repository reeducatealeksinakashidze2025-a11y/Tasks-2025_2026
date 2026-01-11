import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserPipe } from "./pipes/create-user.pipe";
import { UserQueryPipe } from "./pipes/user-query.pipe";
import { UserQueryDto } from "./dto/user-query.dto";
import { IsValidObjectId } from "src/common/dto/is-valid-object-id.dto";


@Controller('users')
export  class UsersController{
    constructor(private readonly usersService:UsersService){}
    @Get()
    getAllUsers(@Query(/*new UserQueryPipe()*/) query:UserQueryDto){
        console.log(query)
        return this.usersService.getAllUsers(query)
    }

    @Post()
    createUser(@Body(new CreateUserPipe()) createUserDto:CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }

    @Get(':id')
    getUserById(@Param() {id}:IsValidObjectId){
        return this.usersService.getUserById(id)
    }

    @Delete(':id')
    deleteUserById(@Param() {id}:IsValidObjectId){
        return this.usersService.deleteUserById(id)
    }

    @Patch(':id')
    updateUserById(@Param() {id}:IsValidObjectId, @Body() updateUserDto:UpdateUserDto){
        return this.usersService.updateUserById(id, updateUserDto)
    }
     @Get('upgrade-subscription/:id')
     upgradeSubscription(@Param() {id}:IsValidObjectId){
        return this.usersService.upgradeSubscription(id)
    }
    
}