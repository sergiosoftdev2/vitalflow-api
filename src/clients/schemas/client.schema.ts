import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { Clinic } from "src/clinics/schemas/clinic.schema";

@Schema({ timestamps: true })
export class Client extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ index: true }) 
  userEmail: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  notes: string;

  @Prop({ type: Types.ObjectId, ref: 'Clinic', required: true, index: true })
  clinic: Clinic | Types.ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);