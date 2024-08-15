import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private dp: Model<UserDocument>) {}

  async get(name: string) {
    return this.dp.findOne({ name });
  }

  async getAll() {
    const res = (await this.dp.find()) ?? [];
    return {
      data: res,
      success: true,
      code: 200,
      message: '请求成功',
    };
  }

  async create(user: User) {
    const dp = new this.dp({
      ...user,
      updateTime: null,
      id: uuid(),
    });
    const res = await dp.save();
    return res.id;
  }

  async delete(id: User['id']) {
    await this.dp.findByIdAndDelete(id);
    return;
  }

  async update(params: User) {
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
