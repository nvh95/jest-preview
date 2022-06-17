#!/usr/bin/env node
const { program } = require('commander');

program
  .command('config-cra')
  .description('Integrate Jest Preview with CRA.')
  .action(() => {
    require('./configCra');
  });

program
  .command('clear-cache')
  .description('Clear Jest and Jest Preview cache.')
  .action(() => {
    require('./clearCache');
  });

program.description('Start Jest Preview server.').action(() => {
  require('./server/previewServer');
});

program.parse(process.argv);

// Checks for available update and notify user
const updateNotifier = require('update-notifier');
const chalk = require('chalk');

const notifier = updateNotifier({
  pkg: require('../package.json'),
  updateCheckInterval: 0, // How often to check for updates
  shouldNotifyInNpmScript: true, // Allows notification to be shown when running as an npm script
  distTag: 'latest', // Can be use to notify user about pre-relase version
});

notifier.notify({
  defer: true, // Try not to annoy user by showing the notification after the process has exited
  message: [
    `${chalk.blue('{packageName}')} has an update available: ${chalk.gray(
      '{currentVersion}',
    )} → ${chalk.green('{latestVersion}')}`,
    `Please run ${chalk.cyan('`{updateCommand}`')} to update.`,
  ].join('\n'),
});
// END checks for available update and notify user
