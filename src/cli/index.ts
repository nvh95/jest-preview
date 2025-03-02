import { program } from 'commander';
import chalk from 'chalk';

program
  .command('config-cra')
  .description('Integrate Jest Preview with CRA.')
  .action(() => {
    import('./configCra');
  });

program
  .command('clear-cache')
  .description('Clear Jest and Jest Preview cache.')
  .action(() => {
    import('./clearCache');
  });

program
  .command('new')
  .description('Start Jest Preview server with the new Vite implementation.')
  .action(() => {
    import('./server/previewServer.new');
  });

program.description('Start Jest Preview server.').action(() => {
  import('./server/previewServer');
});

program.parse(process.argv);

// Dynamically import update-notifier to handle ESM compatibility
(async () => {
  try {
    // Use dynamic import for update-notifier (ESM module)
    const { default: updateNotifier } = await import('update-notifier');
    
    // Checks for available update and notify user
    const notifier = updateNotifier({
      // Built output is at /cli so the relative path is ../package.json
      pkg: require('../../package.json'),
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
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
})();
