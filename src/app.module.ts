import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // 顶层链接数据库
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_NAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.6xs0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    UserModule,
  ],
})
export class AppModule {}
