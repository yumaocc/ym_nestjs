import './config';
import { NestFactory } from '@nestjs/core';

import * as colors from 'colors';
import { AppModule } from './app.module';

// 扩展 dotenv 以支持变量引用，dotenv会将env的变量加入process.env中

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT;
  // note 必须监听对应ip或者所有ip，不然阿里云访问会有问题
  await app.listen(port, '0.0.0.0');
  console.log(
    `
    localhost`,
    colors.green(`http://localhost:${port}
    `),
  );
}
bootstrap();
