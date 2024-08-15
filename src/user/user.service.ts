import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private dp: Model<UserDocument>) {}

  async get(name: string) {
    return this.dp.findOne({ name });
  }

  getAll() {
    return this.dp.find() ?? [];
  }

  create(user: User) {
    const dp = new this.dp(user);
    return dp.save();
  }

  delete(id: User['id']) {
    return this.dp.findByIdAndDelete({ id });
  }

  update(params: User) {
    return this.dp.findByIdAndUpdate({ id: params.id }, params);
  }
}
