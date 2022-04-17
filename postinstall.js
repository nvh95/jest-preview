const { exec } = require('child_process');

const env = process.env;

if (env.INIT_CWD === env.PWD) {
  console.log('Inside Jest Preview. Do not clear Cache.');
} else {
  // TODO: Test on windows, monorepo
  exec(`./node_modules/.bin/jest --clearCache`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
