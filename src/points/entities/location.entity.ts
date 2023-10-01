import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class Location extends Document {
  @Prop({ default: () => new Types.ObjectId() })
  placeId: Types.ObjectId;

  @Prop()
  name: string;
}
