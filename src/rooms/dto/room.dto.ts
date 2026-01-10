import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl, IsOptional, IsUUID } from 'class-validator';

export class RoomDto {
  @ApiProperty({ example: 'room_01', description: 'ID único de la sala' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Consultorio Dental Premium' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: 'Equipado con tecnología de rayos X de última generación.',
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    example: 'https://tu-bucket.s3.amazonaws.com/rooms/room1.jpg',
    description: 'URL de la imagen alojada en S3' 
  })
  @IsUrl() // Valida que sea una URL válida
  @IsNotEmpty()
  photo: string;
}