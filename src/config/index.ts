import * as dotenv from 'dotenv';
//为了保证环境变量最先加载，才将其单独抽离一个文件，放在入口顶部
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
