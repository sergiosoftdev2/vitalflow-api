import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(userData: any) {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findOrCreate(userData: any) {
    const user = await this.findByEmail(userData.email);
    if (user) {
      return user;
    }
    return this.create(userData);
  }
}
