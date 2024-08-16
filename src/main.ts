import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets('public');
  // 这里很重要，vercel是没有状态，需要用session建立一个状态，不然vercel会报500
  app.use(
    session({
      secret: 'blog-server-secret',
      rolling: true,
      name: 'blog-server',
      cookie: { maxAge: null },
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
