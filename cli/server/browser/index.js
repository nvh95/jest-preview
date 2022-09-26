#!/usr/bin/env node

// Credit to https://github.com/bpierre/create-react-app/blob/967db643fc9f85e1f8c84fff4708307c5f006e4f/packages/react-dev-utils/openBrowser.js
const execSync = require('child_process').execSync;
const open = require('open');
var OSX_CHROME = 'google chrome';

function openBrowser(url) {
  // Attempt to honor this environment variable.
  // It is specific to the operating system.
  // See https://github.com/sindresorhus/opn#app for documentation.
  let browser = process.env.BROWSER;

  // Special case: BROWSER="none" will prevent opening completely.
  if (browser === 'none') {
    return false;
  }

  // If we're on OS X, the user hasn't specifically
  // requested a different browser, we can try opening
  // Chrome with AppleScript. This lets us reuse an
  // existing tab when possible instead of creating a new one.
  const shouldTryOpenChromeWithAppleScript =
    process.platform === 'darwin' &&
    (typeof browser !== 'string' || browser === OSX_CHROME);

  if (shouldTryOpenChromeWithAppleScript) {
    // Will use the first open browser found from list
    const supportedChromiumBrowsers = [
      'Google Chrome Canary',
      'Google Chrome Dev',
      'Google Chrome Beta',
      'Google Chrome',
      'Microsoft Edge',
      'Brave Browser',
      'Vivaldi',
      'Chromium',
    ];

    for (let chromiumBrowser of supportedChromiumBrowsers) {
      try {
        // Try our best to reuse existing tab
        // on OS X Google Chrome with AppleScript
        // "ps cax" throws error if "chromiumBrowser" is not opened
        execSync(`ps cax | grep "${chromiumBrowser}"`);
        execSync(
          `osascript openChrome.applescript "${encodeURI(
            url,
          )}" "${chromiumBrowser}"`,
          {
            cwd: __dirname,
            stdio: 'ignore',
          },
        );
        return true;
      } catch (err) {
        // Ignore errors.
      }
    }
  }

  // Another special case: on OS X, check if BROWSER has been set to "open".
  // In this case, instead of passing `open` to `opn` (which won't work),
  // just ignore it (thus ensuring the intended behavior, i.e. opening the system browser):
  // https://github.com/facebookincubator/create-react-app/pull/1690#issuecomment-283518768
  if (process.platform === 'darwin' && browser === 'open') {
    browser = undefined;
  }

  // Fallback to opn
  // (It will always open new tab)
  try {
    var options = { app: browser };
    open(url, options).catch(() => {}); // Prevent `unhandledRejection` error.
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = { openBrowser };
