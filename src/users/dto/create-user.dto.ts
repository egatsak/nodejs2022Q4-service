import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test', description: 'User login (unique)!' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: '1234p!', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
