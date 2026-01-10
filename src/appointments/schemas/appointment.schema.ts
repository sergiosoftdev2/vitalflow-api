import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Clinic', required: true })
  clinicId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  clientId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  employeeId: string;

  // Since rooms are embedded in Clinic, we might just store the roomId string here.
  // Or if we promote Room to a collection, we'd use ObjectId.
  // Given the DTOs, roomId is a string "room_01".
  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ default: 'PENDING' })
  status: string; // PENDING, CONFIRMED, COMPLETED, CANCELLED
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
