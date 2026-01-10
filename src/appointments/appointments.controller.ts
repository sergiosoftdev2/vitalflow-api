import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentDto } from './dto/appointment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({ status: 201, type: AppointmentDto })
  create(@Body() createAppointmentDto: AppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({ status: 200, type: [AppointmentDto] })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('clinic/:clinicId')
  @ApiOperation({ summary: 'Get appointments by clinic ID' })
  @ApiResponse({ status: 200, type: [AppointmentDto] })
  findByClinic(@Param('clinicId') clinicId: string) {
    return this.appointmentsService.findByClinic(clinicId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an appointment by id' })
  @ApiResponse({ status: 200, type: AppointmentDto })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an appointment' })
  @ApiResponse({ status: 200, type: AppointmentDto })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: Partial<AppointmentDto>,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment' })
  @ApiResponse({ status: 200, type: AppointmentDto })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
