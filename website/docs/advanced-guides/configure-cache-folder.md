# Customize Cache Folder Location

Sometimes you might want to run single tests right from within your IDE. Moreover, if you are using a monorepo, you
might find your self with multiple Jest projects with multiple configurations.

## Case #1 Auto-Preview Monorepo setup with single test run from your IDE

In the case of WebStorm/IntelliJ, when you run a single test, it will create an automatic run configuration with the
working directory being to the closest `jest.config.ts` file it can find.

In the case where you want `jest-preview` to always use the same cache folder, you can do the following:

Let's take an example where you have the following monorepo structure:

- `packages/`
    - `package-a/`
        - `jest.config.ts`
        - `jest.setup.ts`
    - `package-b/`
        - `jest.config.ts`
        - `jest.setup.ts`

You can configure, at the package level, or even at the root level (in the case of Nx monorepo) the following auto
preview setup:

```typescript
// package-a/jest.setup.ts

import {cacheFolder} from "jest-preview";

import {resolve, sep} from "path";

// basically, we are targeting {projectRoot}/node_modules/.cache/jest-preview

export const jestPreviewCacheFolder = resolve(`${__dirname + `${sep}..`.repeat(2)}${sep}${cacheFolder}`);

jestPreviewConfigure({
    autoPreview: true,
    cacheFolder: jestPreviewCacheFolder,
});
```

Do not forget to add `setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],` to your `jest.config.ts` file.

## Case #2 Specify cache folder when using the `debug` function

```typescript
// test-utils.ts

import preview from "jest-preview";

const jestPreviewCacheFolder = resolve(`${__dirname + `${sep}..`.repeat(2)}${sep}${cacheFolder}`);

export const debug = () => {
    preview.debug({cacheFolder: jestPreviewCacheFolder});
};
```

In your spec file:

```tsx
import React from 'react';
import {render} from '@testing-library/react';

import Index from '../pages/index';
import {debug} from "./test-utils";

describe('Index', () => {
    it('should render successfully', () => {
        const {baseElement} = render(<Index/>);

        debug();

        // change this to false and this will automatically update, thanks to autoPreview feature
        expect(baseElement).toEqual(true);
    });
});
```