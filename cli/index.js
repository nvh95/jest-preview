#!/usr/bin/env node
const { program } = require('commander');

program
  .command('config-cra')
  .description('Integrate Jest Preview with CRA.')
  .action(() => {
    require('./configCra');
  });

program.description('Start Jest Preview server.').action(() => {
  require('./server/previewServer');
});

program.parse(process.argv);
