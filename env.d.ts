// src/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'dev' | 'prd';
    PORT?: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    MONGO_DB_PASSWORD: string;
    MONGO_DB_NAME: string;
    // 你可以在这里添加更多的环境变量
  }
}
