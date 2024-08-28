import './config';
import { NestFactory } from '@nestjs/core';
import * as colors from 'colors';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseFormatInterceptor } from './common/responseFormatInterceptor';
import { AllExceptionsFilter } from './common/allExceptionsFilter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 CORS
  app.enableCors({
    origin: 'http://localhost:8000', // 指定允许的前端源
    credentials: true, // 允许携带凭证（cookie）
  });

  // 配置 Swagger
  const config = new DocumentBuilder()
    .setTitle('ym_c文档')
    .setDescription('xxxx')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // 访问host/api即可访问api文档
  SwaggerModule.setup('api', app, document);

  // 使用全局拦截器，统一处理返回值
  app.useGlobalInterceptors(new ResponseFormatInterceptor());

  // 使用全局异常过滤器,处理异常
  app.useGlobalFilters(new AllExceptionsFilter());

  // 开启管道，方便 DTO 的校验和数据转换
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

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
