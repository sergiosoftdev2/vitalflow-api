import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsPhoneNumber, IsUrl, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomDto } from 'src/rooms/dto/room.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class ClinicDto {
  @ApiProperty({ example: '696018184153d4e46837056f', required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 5, required: false })
  @IsNumber()
  @IsOptional()
  feesPercentage?: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  adminIds: string[];

  @ApiProperty({ type: [RoomDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomDto)
  @IsOptional()
  rooms?: RoomDto[];

  @ApiProperty({ type: [UserDto], required: false })
  @IsArray()
  @IsOptional()
  employeeIds?: string[] | UserDto[];

  @ApiProperty({ example: 'Clínica Dental Vitalflow' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Calle Mayor 12, Valencia' })
  @IsString()
  address: string;

  @ApiProperty({ example: '600123456', required: false })
  @IsPhoneNumber('ES')
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'contacto@vitalflow.es', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'https://vitalflow.es', required: false })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty({ example: 'https://s3.aws.../logo.png', required: false })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({ example: '09:00', required: false })
  @IsString()
  @IsOptional()
  openingHours?: string;

  @ApiProperty({ example: '20:00', required: false })
  @IsString()
  @IsOptional()
  closingHours?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}