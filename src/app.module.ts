// app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MONGO_APP_NAME, MONGO_BASE_URI } from './mongo/config';
import { User, UserSchema } from './mongo/schema';
console.log('user', User.name);

@Module({
  imports: [
    // 顶层链接数据库
    MongooseModule.forRoot(MONGO_BASE_URI, { appName: MONGO_APP_NAME }),
    // 等于注册一个provider
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
