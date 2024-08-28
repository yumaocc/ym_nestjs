import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class TestUser {
  @Prop()
  @ApiProperty({ description: '名称' })
  name: string;
  @Prop({ required: true })
  @ApiProperty({ description: '密码' })
  password: string;
  @Prop()
  @ApiProperty({ description: '年龄' })
  age: number;
  @Prop()
  @ApiProperty({ description: '主键' })
  id: string;
  @Prop()
  @ApiProperty({ description: '备注' })
  remark?: string;
  @Prop()
  @ApiProperty({ description: '创建时间' })
  createTime: number;
  @Prop()
  @ApiProperty({ description: '更新时间' })
  updateTime?: number;
}

export type UserDocument = Document & TestUser;

export const UserSchema = SchemaFactory.createForClass(TestUser);
