import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const host = '0.0.0.0'; // 监听所有网络接口
  await app.listen(3005, host);
}
bootstrap();
