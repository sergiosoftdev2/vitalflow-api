import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicDto } from './dto/clinic.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Clinics')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new clinic' })
  @ApiResponse({ status: 201, type: ClinicDto, description: 'The clinic has been successfully created.' })
  create(@Body() createClinicDto: ClinicDto) {
    return this.clinicsService.create(createClinicDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clinics' })
  @ApiResponse({ status: 200, type: [ClinicDto] })
  findAll() {
    return this.clinicsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all clinics by user id' })
  @ApiResponse({ status: 200, type: [ClinicDto] })
  findByUser(@Param('userId') userId: string) {
    return this.clinicsService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a clinic by id' })
  @ApiResponse({ status: 200, type: ClinicDto })
  findOne(@Param('id') id: string) {
    return this.clinicsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a clinic' })
  @ApiResponse({ status: 200, type: ClinicDto })
  update(@Param('id') id: string, @Body() updateClinicDto: Partial<ClinicDto>) {
    return this.clinicsService.update(id, updateClinicDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a clinic' })
  @ApiResponse({ status: 200, type: ClinicDto })
  remove(@Param('id') id: string) {
    return this.clinicsService.remove(id);
  }
}
