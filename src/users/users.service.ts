import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOrCreate(userData: any) {
    const user = await this.userModel.findOne({ email: userData.email });
    if (user) {
      return user;
    }
    const newUser = new this.userModel(userData);
    return newUser.save();
  }
}
