import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '696018184153d4e46837056f' })
  _id: string;

  @ApiProperty({ example: 'sergiogarlo12@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Manolo' })
  firstName: string;

  @ApiProperty({ example: 'Lama' })
  lastName: string;

  @ApiProperty({ example: 'https://lh3.googleusercontent.com/...' })
  picture: string;

  @ApiProperty({ example: '100604769067914537364' })
  googleId: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ example: 0 })
  __v: number;
}