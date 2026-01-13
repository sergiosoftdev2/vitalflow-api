import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Session } from './schemas/session.schema';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async createSession(createSessionDto: CreateSessionDto): Promise<Session> {
    const { userId, deviceType, rememberMe } = createSessionDto;

    const daysValid = rememberMe ? 30 : 7;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + daysValid);

    const session = new this.sessionModel({
      user: new Types.ObjectId(userId),
      deviceType,
      expiresAt,
    });

    return session.save();
  }

  async validateSession(sessionId: string): Promise<boolean> {
    try {
        const session = await this.sessionModel.findById(sessionId);
        if (!session) {
          return false;
        }
    
        if (new Date() > session.expiresAt) {
          // Optional: Delete expired session?
          // await this.sessionModel.findByIdAndDelete(sessionId);
          return false;
        }
    
        return true;
    } catch (error) {
        return false;
    }
  }

  async findOne(id: string): Promise<Session | null> {
    return this.sessionModel.findById(id).exec();
  }
}
