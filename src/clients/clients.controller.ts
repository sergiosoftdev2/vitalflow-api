import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, type: ClientDto })
  create(@Body() createClientDto: ClientDto) {
    return this.clientsService.create(createClientDto);
  }



  @Get()
  @ApiOperation({ summary: 'Get all clients by clinic' })
  @ApiResponse({ status: 200, type: [ClientDto] })
  findAll(@Query('clinicId') clinicId: string) {
    if (!clinicId) {
        return []; 
    }
    return this.clientsService.findAll(clinicId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a client by id' })
  @ApiResponse({ status: 200, type: ClientDto })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse({ status: 200, type: ClientDto })
  update(@Param('id') id: string, @Body() updateClientDto: Partial<ClientDto>) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({ status: 200, type: ClientDto })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
