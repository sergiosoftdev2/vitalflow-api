import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Client } from './schemas/client.schema';
import { ClientDto } from './dto/client.dto';
import { User } from '../users/schemas/user.schema';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createClientDto: ClientDto): Promise<Client> {
    if (createClientDto.userEmail) {
      createClientDto.userEmail = createClientDto.userEmail.toLowerCase().trim();
    }
    const createdClient = new this.clientModel(createClientDto);
    return createdClient.save();
  }

  async findOne(id: string): Promise<any> {
    const results = await this.clientModel.aggregate([
      { 
        $match: { _id: new Types.ObjectId(id) } 
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userEmail',
          foreignField: 'email',
          as: 'user'
        }
      },
      { 
        $unwind: { 
          path: '$user', 
          preserveNullAndEmptyArrays: true 
        } 
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          userEmail: 1,
          phone: 1,
          address: 1,
          notes: 1,
          clinic: 1,
          createdAt: 1,
          updatedAt: 1,
          userProfile: {
            picture: '$user.picture',
            googleId: '$user.googleId',
            _id: '$user._id'
          }
        }
      }
    ]);

    if (!results || results.length === 0) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return results[0];
  }

  async findAll(clinicId: string, paginationDto: PaginationDto = {}): Promise<any[]> {
    const { limit = 10, offset = 0, search } = paginationDto;

    const pipeline: any[] = [{ $match: { clinic: clinicId } }];

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { userEmail: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
          ],
        },
      });
    }

    // Lookup first (if we needed to filter by user fields, but we filter by client fields mostly)
    pipeline.push(
      {
        $lookup: {
          from: 'users',
          localField: 'userEmail',
          foreignField: 'email',
          as: 'user',
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          userEmail: 1,
          phone: 1,
          address: 1,
          notes: 1,
          clinic: 1,
          createdAt: 1,
          userProfile: {
            picture: '$user.picture',
            _id: '$user._id',
          },
        },
      },
      // Pagination
      { $skip: offset },
      { $limit: limit },
    );

    return this.clientModel.aggregate(pipeline);
  }

  async update(id: string, updateClientDto: Partial<ClientDto>): Promise<Client> {
    const updatedClient = await this.clientModel
        .findByIdAndUpdate(id, updateClientDto, { new: true })
        .exec();
        
    if (!updatedClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return updatedClient;
  }

  async remove(id: string): Promise<Client> {
    const deletedClient = await this.clientModel.findByIdAndDelete(id).exec();
    if (!deletedClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return deletedClient;
  }

  async getUser(id: string): Promise<User | null> {
  const client = await this.clientModel.findById(id).exec();
  
  if (!client) {
    throw new NotFoundException(`Client with ID ${id} not found`);
  }

  if (!client.userEmail) return null;
  return this.userModel.findOne({ email: client.userEmail }).exec();
}
  

}
