import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  age: number;
  @Prop()
  id: string;
}

export type UserDocument = Document & User;

export const UserSchema = SchemaFactory.createForClass(User);
