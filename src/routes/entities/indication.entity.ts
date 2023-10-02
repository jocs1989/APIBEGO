import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export class Indication extends Document {

  @Prop({ default: () => new Types.ObjectId() })
  oi: Types.ObjectId; 

  @Prop()
  ruta: string;

  @Prop()
  coordinates: string;

  @Prop()
  distance: string;

 

}
