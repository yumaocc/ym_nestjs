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
$ pnpm start
```
