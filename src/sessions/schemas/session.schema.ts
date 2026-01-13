import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
export class Session extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId;

  @Prop({ required: true })
  deviceType: string;

  @Prop({ required: true, index: { expires: 0 } })
  expiresAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
