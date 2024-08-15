// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('请提供模块名称');
  process.exit(1);
}

const commands = [
  `nest generate mo ${moduleName}`,
  `nest generate co ${moduleName}`,
  `nest generate s ${moduleName}`,
];

for (const command of commands) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行命令时出错: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`标准错误: ${stderr}`);
      return;
    }
    console.log(`标准输出: ${stdout}`);
  });
}
