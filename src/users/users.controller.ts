import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './users.interface';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  changePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ): Promise<User> {
    return this.userService.updateUserPassword(id, updatePassword);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
