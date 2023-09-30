import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enumeration/roles.enumeration';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  isValid: boolean;

  @Prop({ type: [String], default: [Role.USER] })
  roles: Role[];
}
export const UserSchema = SchemaFactory.createForClass(User);
