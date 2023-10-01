import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';
import { Location } from './location.entity';
import { OI } from './oi.entity';
@Schema()
export class Point extends Document {
  @Prop()
  _id: OI;

  @Prop()
  location: Location;
}
export const PointSchema = SchemaFactory.createForClass(Point);
