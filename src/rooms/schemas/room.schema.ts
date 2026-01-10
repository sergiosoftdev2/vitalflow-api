import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop({ required: true })
  id: string; // Internal ID for the room within the clinic? Or use _id? The DTO says 'id'. I'll keep it as a string prop.

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  photo: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
