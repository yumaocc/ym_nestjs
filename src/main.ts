import './config';
import { NestFactory } from '@nestjs/core';
import * as colors from 'colors';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 CORS
  app.enableCors({
    origin: 'http://localhost:8000', // 指定允许的前端源
    credentials: true, // 允许携带凭证（cookie）
  });

  // 使用 cookie-parser 中间件
  app.use(cookieParser());

  const port = process.env.PORT || 3000;
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
