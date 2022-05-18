#!/usr/bin/env node
const { program } = require('commander');

program
  .command('config-cra')
  .description('Integrate Jest Preview with CRA.')
  .action(() => {
    // TODO: Execute function instead of require-ing
    require('./configCra');
  });

program.action(() => {
  // TODO: Execute function instead of require-ing
  require('./server/previewServer');
});

program.parse(process.argv);
