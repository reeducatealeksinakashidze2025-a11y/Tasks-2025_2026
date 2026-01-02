import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Controller('users')
export  class UsersController{
    constructor(private readonly usersService:UsersService){}
    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }

    @Get(':id')
    getUserById(@Param('id') id:string){
        return this.usersService.getUserById(Number(id))
    }

    @Delete(':id')
    deleteUserById(@Param('id') id:string){
        return this.usersService.deleteUserById(Number(id))
    }

    @Patch(':id')
    updateUserById(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto){
        return this.usersService.updateUserById(Number(id), updateUserDto)
    }

}