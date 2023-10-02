import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Indication } from './indication.entity';
import { ApiGoogle } from '../interfaces/api.google.interface'; 
@Schema()
export class Route extends Document {

 @Prop({ default: Date.now() }) 
  date: Date;

  @Prop()
  idPointA: string;

  @Prop()
  idPointB: string;

  @Prop()
  indication: Indication;

  @Prop({ default:true})
  isActive: boolean;

 

}
export const RouteSchema = SchemaFactory.createForClass(Route);
