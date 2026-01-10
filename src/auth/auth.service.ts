import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName } = registerDto;

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

    // Handle Mongoose Document vs POJO if necessary, though UserDto implies POJO usually.
    // Casting to any because UserDto hides the password field, but it exists at runtime.
    const userObj =
      typeof (user as any).toObject === 'function'
        ? (user as any).toObject()
        : user;
    const { password: _, ...userResponse } = userObj as any;
    return userResponse;
  }

  async validateUser(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    // Cast to any to access password which is hidden by UserDto type
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

    // Since findByEmail uses .lean(), we verify if toObject exists before calling it,
    // or just treat it as an object.
    const userObj =
      typeof (user as any).toObject === 'function'
        ? (user as any).toObject()
        : user;
    const { password: _, ...userResponse } = userObj as any;
    return userResponse;
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const user = await this.usersService.findOrCreate(req.user);

    return {
      message: 'User information from google',
      user: user,
    };
  }
}
