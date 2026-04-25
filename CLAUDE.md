# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is jest-preview

Jest Preview is a browser-based debugging tool that visualizes Jest test execution in real time. When a test calls `debug()`, it serializes the current DOM and sends it to a local server, which streams it to a browser dashboard over WebSocket. This lets developers see the actual rendered UI instead of reading raw HTML.

## Commands

```bash
# Build
npm run build           # Build all bundles with Rollup
npm run build:watch     # Rebuild on file changes

# Test
npm run test            # Run server + tests in parallel
npm run test:dev        # Jest watch mode (clears cache first)
npm run test:ci         # Single CI run (no watch, NODE_ENV=test)

# Run a single test file
npx jest src/__tests__/less/index.test.ts

# Lint & format
npm run lint            # ESLint on .ts/.tsx/.js/.jsx
npm run prettier        # Check formatting
npm run prettier:fix    # Auto-fix formatting

# Development
npm run dev             # Vite dev server for demo app
npm run server          # Run the jest-preview HTTP/WS server
npm run server:watch    # Server with nodemon auto-restart

# Utilities
npm run clearCache      # Clear Jest + jest-preview cache
```

Uses **pnpm** as the package manager.

## Architecture

### Core data flow

1. Test calls `debug()` → DOM is serialized to `node_modules/.cache/jest-preview/index.html`
2. Server watches that file with `chokidar` → broadcasts update over WebSocket (port 3337)
3. Browser dashboard (served on port 3336) receives the update → renders the preview

### Key source files

| File | Role |
|------|------|
| `src/preview.ts` | `debug()` function; `materializeCssomIntoText()` converts CSSOM-injected styles into serializable text |
| `src/configure.ts` | `jestPreviewConfigure()` — sets global CSS, public folder, and patches `it`/`test` for `autoPreview` |
| `src/transform.ts` | The large (~1000 line) Jest transform: Sass/Less → CSS, CSS Modules via PostCSS, SVG → React via SVGR, image path rewriting |
| `src/cli/server/previewServer.ts` | Express-like server using `connect` + `sirv`; WebSocket server; auto-opens browser |
| `src/cli/index.ts` | CLI entry point (`config-cra`, `clear-cache` commands) |
| `src/constants.ts` | Cache folder paths shared across modules |
| `src/index.ts` | Public API re-exports |

### Build output (Rollup — `rollup.config.mjs`)

Five separate bundles are emitted:
- `dist/` — main library (CJS + ESM)
- `transforms/css.js`, `transforms/file.js`, `transforms/fileCRA.js` — standalone Jest transforms users point to in `jest.config.js`
- `dist/cli/index.js` — CLI binary

### CSS/asset transform pipeline (order matters)

1. Pre-processors: Sass → CSS, Less → CSS
2. CSS Modules (PostCSS modules plugin)
3. PostCSS (if `postcss.config.js` exists in project)
4. Plain CSS injected into `document.head` via `<style>`
5. SVG files → React components via `@svgr/core`
6. Other files → relative path reference

### Test setup

- Jest config: `jest.config.js` — jsdom environment, `@swc/jest` transpiler, custom transforms
- SWC config: `.swcrc` — ES2017, React JSX runtime, CommonJS output
- Demo app setup: `demo/setupTests.js` (imports jest-preview)
- Tests live in `src/__tests__/`

### autoPreview

When `autoPreview: true` is passed to `jestPreviewConfigure()`, `configure.ts` monkey-patches Jest's global `it`/`test` to automatically call `debug()` on test failure, without the developer needing to add `debug()` calls manually.
