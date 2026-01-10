import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<UserDto> {
    return this.userModel.findOne({ email }).lean().exec() as unknown as UserDto;
  }

  async create(userData: any): Promise<UserDto> {
    const newUser = new this.userModel(userData);
    return newUser.save() as unknown as UserDto;
  }

  async findOrCreate(userData: any): Promise<UserDto> {
    const user = await this.findByEmail(userData.email);
    if (user) {
      return user;
    }
    return this.create(userData);
  }

  async findById(id: string): Promise<UserDto | null> {
    return this.userModel.findById(id).lean().exec() as unknown as UserDto;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.googleId && updateUserDto.email && updateUserDto.email !== user.email) {
      throw new BadRequestException('No se puede cambiar el email de una cuenta vinculada a Google');
    }

    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }) as unknown as UserDto;
  }

  async delete(id: string): Promise<UserDto> {
    return this.userModel.findByIdAndDelete(id) as unknown as UserDto;
  }

  async findAll(): Promise<UserDto[]> {
    return this.userModel.find().lean().exec() as unknown as UserDto[];
  }

  async findUsersByIds(userIds: string[]): Promise<UserDto[]> {
    return this.userModel.find({ _id: { $in: userIds } }).lean().exec() as unknown as UserDto[];
  }s

}
