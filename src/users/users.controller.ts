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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponse } from './entities/users.entity';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Create user (remove password from response)' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users (remove password from response)' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll(): Promise<UserResponse[]> {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get user by ID (remove password from response)' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<UserResponse> {
    return this.userService.getById(id);
  }

  @ApiOperation({
    summary: 'Update user by ID (remove password from response)',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  changePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    return this.userService.updateUserPassword(id, updatePasswordDto);
  }

  @ApiOperation({
    summary: 'Delete user by ID (empty response)',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
