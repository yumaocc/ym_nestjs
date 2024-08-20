# web
[对应前端](https://github.com/yumaocc/nestjs-web/blob/master/src/pages/Home/index.tsx)

# 部署服务器阿里云
todo...

# 数据库：🥭他弟弟芒果db

```bash
$ pnpm i @nestjs/mongoose mongoose
$ brew tap mongodb/brew
$ brew install mongodb-community
$ brew services start mongodb-community
$ mongod --dbpath /path/to/dbdir --logpath /path/to/mongodb.log --fork
$ mongosh
```

停止芒果db

```bash
brew services stop mongodb-community
```

# 运行

```bash
$ pnpm install
$ pnpm start:dev
```

# 快捷命令

一键生成模块,第一个简洁，第二个命令会自动生成方法

```bash
$ pnpm run create xxx
$ nest g res xxx
```

# 数据流
控制器 => 管道 => DTO => 芒果db

数据流概述
请求到达控制器：客户端发送请求到服务器，NestJS 的控制器接收请求。
管道处理：在进入控制器处理函数之前，NestJS 的管道（Pipes）会对请求数据进行验证和转换。
DTO 验证：管道利用 DTO 类和验证装饰器对请求数据进行验证。如果验证通过，数据会被转换并传递到控制器处理函数。
服务层业务逻辑：控制器将经过验证和转换的数据传递给服务层，服务层处理业务逻辑。
Mongoose 模型：服务层使用 Mongoose 模型与 MongoDB 交互，将数据存储到数据库中。