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
