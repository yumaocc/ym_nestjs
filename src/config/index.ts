import * as dotenv from 'dotenv';
// 扩展 dotenv 以支持变量引用，dotenv会将env的变量加入process.env中
//为了保证环境变量最先加载，才将其单独抽离一个文件，放在入口顶部
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const TOKEN_KEY = 'ym_c';
