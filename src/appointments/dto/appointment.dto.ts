import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';

export class AppointmentDto {
  @ApiProperty({ example: 'app_98765' })
  id: string;

  @ApiProperty({ example: '696018184153...' })
  @IsString()
  @IsNotEmpty()
  clinicId: string;

  @ApiProperty({ example: '696018184153...' })
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ example: '696018184153...' })
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({ example: 'room_01' })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({ example: '2026-01-15T09:00:00Z' })
  @IsDateString()
  startTime: Date;

  @ApiProperty({ example: '2026-01-15T10:00:00Z' })
  @IsDateString()
  endTime: Date;

  @ApiProperty({ example: 'confirmed', enum: ['pending', 'confirmed', 'cancelled', 'completed'] })
  @IsEnum(['pending', 'confirmed', 'cancelled', 'completed'])
  status: string;
}