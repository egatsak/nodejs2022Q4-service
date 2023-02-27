import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { AuthGuard } from './strategies/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signin(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signin(createUserDto);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  async refreshToken(@Body() refreshDto: RefreshDto) {
    return await this.authService.generateNewRefreshToken(refreshDto);
  }
}
