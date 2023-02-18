import { ApiProperty } from '@nestjs/swagger';

export class UserScheme {
  @ApiProperty({
    example: '573274fe-c1e9-4348-adb8-8f7290b901e9',
    description: 'UserID as UUID',
  })
  id: string;

  @ApiProperty({ example: 'John', description: 'Unique login of the user' })
  login: string;

  @ApiProperty({
    example: 1,
    description: 'Version increments every time user is updated',
  })
  version: number;

  @ApiProperty({
    example: '1234567890',
    description: 'Date of user creation, in ms',
  })
  createdAt: number;

  @ApiProperty({
    example: '1234567891',
    description: 'Date of user update, in ms',
  })
  updatedAt: number;
}
