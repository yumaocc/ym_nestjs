import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const session = require('express-session');

import * as net from 'net';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PortService {
  checkPort(port: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const server = net.createServer();

      server.once('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          resolve(true); // 端口被占用
        } else {
          reject(err);
        }
      });

      server.once('listening', () => {
        server.close();
        resolve(false); // 端口未被占用
      });

      server.listen(port);
    });
  }

  async findAvailablePort(startPort: number): Promise<number> {
    let port = startPort;
    while (await this.checkPort(port)) {
      port += 1;
    }
    return port;
  }
}

export default async function bootstrap() {
  console.log('初始化');

  const portUtils = new PortService();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log('初始化完成');
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
  console.log('服务挂载');
  const port = await portUtils.findAvailablePort(3000);
  await app.listen(port);
  console.log('服务完成');
}
bootstrap();
