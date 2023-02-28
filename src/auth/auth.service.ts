import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh.dto';
import {
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { UserTokenResponse } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    const user = await this.usersService.createUser(dto);

    const tokens = await this.createTokensPair(user.id);
    const userToResponse: UserTokenResponse = { ...user, ...tokens };

    return userToResponse;
  }

  async signin(dto: CreateUserDto) {
    const user = await this.usersService.getByLogin(dto.login);
    if (
      !(await this.usersService.validatePassword(dto.password, user.password))
    ) {
      throw new ForbiddenException(`Incorrect password!`);
    }

    const tokens = await this.createTokensPair(user.id);
    const userToResponse: UserTokenResponse = {
      ...user.toResponse(),
      ...tokens,
    };

    return userToResponse;
  }

  async generateNewRefreshToken(dto: RefreshDto) {
    try {
      const body = (await this.jwtService.verifyAsync(dto.refreshToken)) as {
        id: string;
      };

      if (!body) throw new UnauthorizedException('Token invalid or expired');

      const user = await this.usersService.getById(body.id);

      return await this.createTokensPair(user.id);
    } catch (e) {
      throw new UnauthorizedException('Token invalid or expired');
    }
  }

  async createTokensPair(id: string) {
    const accessToken = await this.jwtService.signAsync(
      { id },
      {
        expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
        secret: process.env.JWT_SECRET_KEY,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { id },
      {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      },
    );

    return { accessToken, refreshToken };
  }
}
