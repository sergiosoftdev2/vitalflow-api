import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false, example: 'web-chrome' })
  @IsString()
  @IsOptional()
  deviceType?: string;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsOptional()
  rememberMe?: boolean;
}
