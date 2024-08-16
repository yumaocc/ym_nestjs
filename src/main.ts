import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';

const expressApp = express();

async function bootstrapServer() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  await app.init();
  return serverlessExpress({ app: expressApp });
}

let server: any;

async function bootstrapLocal() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3005;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

// 检测是否在本地开发环境
if (process.env.NODE_ENV !== 'production') {
  bootstrapLocal();
}

const handler = async (event: any, context: any) => {
  if (!server) {
    server = await bootstrapServer();
  }
  return server(event, context);
};

export default handler;
