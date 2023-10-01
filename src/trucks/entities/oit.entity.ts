import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class OiT extends Document {
  @Prop({ default: () => new Types.ObjectId() })
  oi: Types.ObjectId;
}
