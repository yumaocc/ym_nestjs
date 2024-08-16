import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestUser, UserDocument } from './user.schema';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';
@Injectable()
export class UserService {
  @InjectModel(TestUser.name) private dp: Model<UserDocument>;
  constructor() {}

  async get(name: string) {
    return this.dp.findOne({ name });
  }

  async getAll() {
    const res = await this.dp.find();
    return {
      data: res,
    };
  }

  async create(user: TestUser) {
    const dp = new this.dp({
      ...user,
      updateTime: null,
      id: uuid(),
    });
    const res = await dp.save();
    return res.id;
  }

  async delete(id: TestUser['id']) {
    await this.dp.findByIdAndDelete(id);
    return;
  }

  async update(params: TestUser) {
    const res = await this.dp.findOneAndUpdate(
      { id: params.id },
      {
        ...params,
        updateTime: dayjs().valueOf(),
      },
    );

    return res.id;
  }
}
