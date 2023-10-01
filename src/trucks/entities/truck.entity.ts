import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

import { OiT } from './oit.entity';
@Schema()
export class Truck extends Document {
  @Prop()
  _id: OiT;

  @Prop()
  model: string;

  @Prop()
  make: string;

  @Prop()
  year: number;

  @Prop()
  color: string;

  @Prop()
  transportWeight: number;

  @Prop({ default: () => Math.floor(Date.now() / 1000) }) // Valor predeterminado con la marca de tiempo Unix actual
  created_at: number;
}
export const TruckSchema = SchemaFactory.createForClass(Truck);
