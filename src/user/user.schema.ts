import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TestUser {
  @Prop()
  name: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  age: number;
  @Prop()
  id: string;
  @Prop()
  remark?: string;
  @Prop()
  startTime: number;
  @Prop()
  updateTime?: number;
}

export type UserDocument = Document & TestUser;

export const UserSchema = SchemaFactory.createForClass(TestUser);
