import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { MONGO_BASE_URI } from './mongo/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // 顶层链接数据库
    // MongooseModule.forRoot(MONGO_BASE_URI),
    UserModule,
  ],
})
export class AppModule {}
