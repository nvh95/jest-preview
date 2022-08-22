const { spawnSync } = require('child_process');

// const result = spawnSync('node', [
//   '-e',
//   `const postcss = require('postcss');
//   const postcssrc = require('postcss-load-config');
//   const { readFileSync } = require('fs');
//   const css = readFileSync('index.css', 'utf8');

//   postcssrc().then(({ plugins, options }) => {
//     // console.log({ plugins, options });

//     postcss(plugins)
//       .process(css, { ...options, from: 'index.css' })
//       .then((result) => console.log(result.css));
//   });`,
// ]);
// const stderr = result.stderr.toString('utf-8').trim();
// if (stderr) console.error(stderr);
// if (result.error) throw result.error;
// const a = result.stdout.toString();
// console.log(a);

function havePostCss() {
  const result = spawnSync('node', [
    '-e',
    `const postcssrc = require('postcss-load-config');
  
    postcssrc().then(({ plugins, options }) => {
      console.log(true)
    })
    .catch(error=>{
      if (!/No PostCSS Config found/.test(error.message)) {
        throw new Error("Failed to load PostCSS config", error)
      }
      console.log(false)
    });`,
  ]);
  const stderr = result.stderr.toString('utf-8').trim();
  if (stderr) console.error(stderr);
  if (result.error) throw result.error;
  return result.stdout.toString().trim() === 'true';
}

console.log(havePostCss());
