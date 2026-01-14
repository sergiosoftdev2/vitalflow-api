import { Controller, Get, Delete, Param, Req } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SessionDto } from './dto/session.dto';

@ApiTags('Sessions')
@ApiBearerAuth()
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active sessions for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of sessions', type: [SessionDto] })
  findAll(@Req() req) {
    return this.sessionsService.findAllByUser(req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Revoke/Logout a specific session' })
  @ApiResponse({ status: 200, description: 'Session revoked' })
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}
