import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './mongo/schema';

@Controller()
export class AppController {
  constructor(
    readonly Service: AppService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @Get('/')
  async getHello(): Promise<any> {
    const res = await this.userModel.find().exec();
    return res;
  }
  @Post('/add')
  add(@Body() user: User) {
    const userModel = new this.userModel(user);
    return userModel.save();
  }

  @Get('/delete')
  delete(@Query() params: { id: string }) {
    return this.userModel.findByIdAndDelete(params.id);
  }
}
