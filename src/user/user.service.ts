import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestUser, UserDocument } from './user.schema';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { Pagination } from 'src/common/pagination';

@Injectable()
export class UserService {
  @InjectModel(TestUser.name) private dp: Model<UserDocument>;
  constructor() {}

  async get(name: string) {
    return await this.dp.findOne({ name }).select('-_id');
  }

  async getUsersQuery(params: PaginationDto) {
    const { pageSize, current, ...rest } = params;

    const skip = (current - 1) * pageSize;

    const query = Object.entries(rest).reduce((acc, [key, value]) => {
      acc[key] = { $regex: value, $options: 'i' };
      return acc;
    }, {});

    const total = await this.getAll();

    const records = await this.dp
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .select('-_id');

    return new Pagination(pageSize, current, total.length, records);
  }

  async getAll() {
    const res = await this.dp.find();
    return res;
  }

  async create(user: TestUser) {
    const dp = new this.dp({
      ...user,
      updateTime: null,
      id: uuid(),
      createTime: dayjs().valueOf(),
    });
    const res = await dp.save();

    return res.id;
  }

  async delete(id: TestUser['id']) {
    await this.dp.findOneAndDelete({ id });
    return id;
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
