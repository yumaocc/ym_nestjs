import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// 生成token秘钥
function generateSecret() {
  if (!process.env.JWT_SECRET) {
    const secret = crypto.randomBytes(32).toString('hex');
    const configPath = path.join(__dirname, '../.env');
    fs.writeFile(configPath, `JWT_SECRET=${secret}`, (err) => {
      console.log(err);
    });
  }
}

generateSecret();
