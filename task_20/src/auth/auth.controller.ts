import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/sing-up.dto';
import { SingInDto } from './dto/sing-in.dto';
import { IsAuthGuard } from 'src/guards/is-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sing-up')
  singUp(@Body() singUpDto: SingUpDto) {
    return this.authService.singUp(singUpDto);
  }

  @Post('sing-in')
  singIn(@Body() singInDto:SingInDto) {
    return this.authService.singIn(singInDto)
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  currentUser(@UserId() userId){
    return this.authService.currentUser(userId)
  }

}
