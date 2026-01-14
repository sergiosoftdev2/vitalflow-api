import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
  @ApiProperty({ description: 'The user ID linking to the session', example: '60d0fe4f5311236168a109ca' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Type of device connecting', example: 'mobile' })
  @IsString()
  @IsNotEmpty()
  deviceType: string;

  @ApiProperty({ description: 'Whether to remember the session (30 days) vs standard (7 days)', required: false, default: false })
  @IsBoolean()
  @IsOptional()
  rememberMe?: boolean;
}
