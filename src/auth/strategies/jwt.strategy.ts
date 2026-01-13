import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SessionsService } from '../../sessions/sessions.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private sessionsService: SessionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'EXTREMELY_SECRET_KEY', // Fallback for dev
    });
  }

  async validate(payload: any) {
    // payload should contain { sub: userId, sid: sessionId }
    const { sid } = payload;
    
    if (!sid) {
        throw new UnauthorizedException('Token missing session ID');
    }

    const isValid = await this.sessionsService.validateSession(sid);
    if (!isValid) {
      throw new UnauthorizedException('Session expired or invalid');
    }

    // Return the user ID and session ID to the request object
    return { userId: payload.sub, sessionId: sid };
  }
}
