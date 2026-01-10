import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Room, RoomSchema } from '../../rooms/schemas/room.schema';

@Schema({ timestamps: true })
export class Clinic extends Document {
  @Prop({ type: [String], default: [] })
  adminIds: string[]; // List of admin IDs

  @Prop({ required: true, default: 0 })
  feesPercentage: number;

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  employeeIds: string[]; // List of employee IDs

  @Prop({ type: [RoomSchema], default: [] })
  rooms: Room[];

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  website: string;

  @Prop()
  logo: string;

  @Prop()
  openingHours: string;

  @Prop()
  closingHours: string;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);
