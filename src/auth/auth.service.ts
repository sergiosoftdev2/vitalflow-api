import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SessionsService } from '../sessions/sessions.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sessionsService: SessionsService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, deviceType } = registerDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    
    // Auto-login after register
    const session = await this.sessionsService.createSession({
        userId: (user as any)._id.toString(),
        deviceType: deviceType || 'unknown-register',
        rememberMe: false,
    });

    const payload = { sub: (user as any)._id.toString(), sid: session._id.toString() };

    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password, deviceType, rememberMe } = loginDto;
    const user = await this.usersService.findByEmail(email);
    const userWithPassword = user as any;

    if (!userWithPassword || !userWithPassword.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      userWithPassword.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const session = await this.sessionsService.createSession({
        userId: user._id.toString(),
        deviceType: deviceType || 'unknown-login',
        rememberMe: !!rememberMe,
    });

    // Generate Payload
    const payload = { sub: user._id.toString(), sid: session._id.toString() };

    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const user = await this.usersService.findOrCreate(req.user);

    // Create Session for Google Login too
    const session = await this.sessionsService.createSession({
        userId: user._id.toString(),
        deviceType: 'google-oauth',
        rememberMe: true, // Google logins are usually persistent
    });

    const payload = { sub: user._id.toString(), sid: session._id.toString() };

    return {
      message: 'User information from google',
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
