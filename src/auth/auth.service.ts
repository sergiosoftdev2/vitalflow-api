import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
