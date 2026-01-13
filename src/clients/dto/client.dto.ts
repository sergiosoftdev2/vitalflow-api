import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsNotEmpty, IsMongoId } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';
import { ClinicDto } from '../../clinics/dto/clinic.dto';

export class ClientDto {
  @ApiProperty({ example: '696018184153d4e46837056f', required: false })
  @IsString()
  @IsOptional()
  _id?: string;

  @ApiProperty({ example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'The email of the linked user account', type: UserDto, required: false })
  @IsOptional()
  @IsEmail()
  userEmail: string;

  @ApiProperty({ example: '600123456', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Calle Falsa 123', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'Paciente con alergia a la penicilina', required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ description: 'The clinic ID this client belongs to', example: '69622d2a89caef103d075ad1', required: true })
  @IsMongoId()
  @IsNotEmpty()
  clinic: string;

  @ApiProperty({ type: Date })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ type: Date })
  @IsOptional()
  updatedAt?: Date;
}
