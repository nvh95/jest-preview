
                                                                                                  
⏺ Here's a breakdown of processCss (lines 167–215) and the machinery it relies on:
                                                                                                                
  ---                                                                                             
  What processCss does                                                                                          
                                                                                                                
  It is a Jest transformer's process() function — called once per CSS file import during test execution. Its job
   is to return JavaScript code (as a string) that, when executed in jsdom, loads the styles.                   
                                                            
  Decision tree                                                                                                 
                                                            
  processCss(src, filename)                                                                                     
  │                                                         
  ├─ Pure CSS + no PostCSS config  →  <link rel="stylesheet"> pointing at the relative path
  │                                                                                                             
  ├─ Sass/SCSS                     →  compile via sass (processSass) → raw CSS string
  │                                                                                                             
  ├─ Less                          →  compile via node subprocess (processLess) → raw CSS string
  │                                                                                                             
  └─ Has PostCSS config OR is CSS Module                    
         └─ processPostCss(cssSrc, filename, opts)                                                              
                ├─ with config file  →  postcss-load-config + user plugins + postcss-modules (if .module.*)     
                └─ no config file   →  bare postcss + postcss-modules (if .module.*)                            
                                                                                                                
  ---                                                                                                           
  The "subprocess" pattern — the most important design decision
                                                                                                                
  Three functions (havePostCss, processPostCss, processLess) all follow the same pattern:
                                                                                                                
  1. Build a JS script as a string at runtime                                                                   
  2. Write it to a temp file in the Jest cache folder (createTempFile)                                          
  3. Run it with spawnSync('node', [tempFile])                                                                  
  4. Read stdout, delete the temp file, return the result                                                       
                                                                                                                
  Why: Jest transforms run in a CommonJS context that can't do async/await (see comment at line 229). PostCSS   
  and Less APIs are async-only. The only way to go async in a sync transformer is to spawn a child process and  
  wait for it synchronously.                                                                                    
                                                            
  Cost: The TODO at line 283 acknowledges this is ~350 ms per CSS file. havePostCss() itself also spawns a      
  subprocess on every file (line 56), doubling the cost when PostCSS is present — noted at line 41.
                                                                                                                
  ---                                                       
  The parsePostCssExternalOutput protocol (lines 247–263)
                                                                                                                
  Since processPostCss and processLess communicate through stdout of a subprocess, they need a structured text
  protocol. The subprocess writes:                                                                              
                                                            
  cssModulesExportedTokens||| {"button":"_button_abc12_1"}                                                      
  ---                                                                                                           
  css||| .button_abc12_1 { color: red; }
  ---                                                                                                           
                                                            
  parsePostCssExternalOutput splits on --- and then on ||| to extract the two fields. This is why               
  spawnSyncWithNoColor strips ANSI color codes — any color in the subprocess output would corrupt the protocol.
                                                                                                                
  ---                                                       
  CSS Modules scoped name generation (lines 296–306)
                                                                                                                
  The generateScopedName function deliberately normalizes newline characters before hashing:
                                                                                                                
  const removedNewLineCharactersCss = css.replace(/(\r\n|\n|\r)/g, '');
                                                                                                                
  This is a cross-platform fix: Windows uses \r\n, Unix uses \n, so the same CSS file would produce different   
  hashes on different OSes without this normalization.                                                          
                                                                                                                
  ---                                                       
  Pure CSS fast path (lines 176–188)
                                                                                                                
  When the file is plain CSS with no PostCSS config, processCss skips all processing and emits a <link 
  rel="stylesheet"> pointing at the relative path from the project root. The browser then fetches the actual    
  file from the jest-preview server — the server serves the project root statically via sirv. This avoids the
  subprocess cost entirely.                                                                                     
                                                            
  ---
  Key issues flagged by existing TODOs
                                                                                                                
  ┌───────────────┬────────────────────────────────────────────────────────────┐
  │   Location    │                           Issue                            │                                
  ├───────────────┼────────────────────────────────────────────────────────────┤                                
  │ Line 41       │ havePostCss() spawns a process per file, not cached        │
  ├───────────────┼────────────────────────────────────────────────────────────┤                                
  │ Line 173      │ Same: called on every processCss invocation                │
  ├───────────────┼────────────────────────────────────────────────────────────┤                                
  │ Lines 283–286 │ processPostCss is ~350 ms per file                         │
  ├───────────────┼────────────────────────────────────────────────────────────┤                                
  │ Line 315      │ postcssrc() re-read on every file (no singleton)           │
  ├───────────────┼────────────────────────────────────────────────────────────┤                                
  │ Line 404      │ ~ tilde importer doesn't use require.resolve for monorepos │
  ├───────────────┼────────────────────────────────────────────────────────────┤                                
  │ Line 24       │ styl/stylus not yet supported                              │
  └───────────────┴────────────────────────────────────────────────────────────┘                              
