// @ts-check
const fs = require('fs');

const rootContributing = '../CONTRIBUTING.md';
const contributingDoc = './docs/others/contributing.md';

const rootContributingContent = fs.readFileSync(rootContributing, 'utf8');

// Append to contributingDoc
fs.appendFile(contributingDoc, rootContributingContent, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
