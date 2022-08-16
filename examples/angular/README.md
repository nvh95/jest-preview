# Angular CLI

## Integrating Jest Preview to Angular CLI

This example demonstrates how to use `jest-preview` with the Angular CLI. See the full source code at [Angular CLI Example on GitHub](https://github.com/nvh95/jest-preview/tree/main/examples/angular)

## Setup Jest with Angular CLI

Use an [`@angular-builders/jest`](https://www.npmjs.com/package/@angular-builders/jest) builder for the `test` architect target of your application project.

Either use Jest projects or add the `src` directory of your application project to the `roots` option of your Jest configuration, for example:

```js
module.exports =
  /** @type {import('@jest/types').Config.InitialOptions} */
  {
    roots: ['<rootDir>/src'],
  };
```

## Installation and Usage

Please refer to [Installation](/docs/getting-started/installation) and [Usage](/docs/getting-started/usage).

In step 4 of installation, **Configure global CSS**, add import statements matching the global stylesheets loaded by he `styles` option of your application's `build` architect target, for example:

```typescript
import './styles.css';
```

In step 5 of installation, **Configure public folder**, set the `publicFolder` option for `jestPreviewConfigure` to your application project's `src` directory, for example:

```typescript
import { jestPreviewConfigure } from 'jest-preview';

jestPreviewConfigure({
  publicFolder: 'src',
});
```

### Component styles

Jest Preview does not currently have support for compiling Angular component styles (tracked in [#237](https://github.com/nvh95/jest-preview/issues/237)). As a workaround, use external stylesheets for your components and add equivalent import statements to your test files, for example by exporting `styleUrls` and reusing them in your component test:

```typescript
// counter.component.ts
import { Component } from '@angular/core';

export const styleUrls = ['./counter.component.css']; // 👈

@Component({
  selector: 'app-counter',
  standalone: true,
  styleUrls: [...styleUrls],
  template: `
    <button data-testid="increase" type="button" (click)="onClick()">
      count is:
      <div data-testid="count">{{ count }}</div>
    </button>
  `,
})
export class CounterComponent {
  count = 0;

  onClick(): void {
    this.count += 1;
  }
}
```

```typescript
// counter.component.spec.ts
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import preview from 'jest-preview';
import { CounterComponent, styleUrls } from './counter.component'; // 👈
styleUrls.forEach((styleUrl) => import(styleUrl)); // 👈

describe(CounterComponent.name, () => {
  it('should work as expected', async () => {
    const user = userEvent.setup();
    await render(CounterComponent);

    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));

    // Open http://localhost:3336 to see preview
    // Require to run `jest-preview` server before
    preview.debug();

    expect(screen.getByTestId('count')).toContainHTML('6');
  });
});
```

or add equivalent import statements to your component test:

```typescript
// counter.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  styleUrls: ['./counter.component.css'], // 👈
  template: `
    <button data-testid="increase" type="button" (click)="onClick()">
      count is:
      <div data-testid="count">{{ count }}</div>
    </button>
  `,
})
export class CounterComponent {
  count = 0;

  onClick(): void {
    this.count += 1;
  }
}
```

```typescript
// counter.component.spec.ts
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import preview from 'jest-preview';
import { CounterComponent } from './counter.component';
import './counter.component.css'; // 👈

describe(CounterComponent.name, () => {
  it('should work as expected', async () => {
    const user = userEvent.setup();
    await render(CounterComponent);

    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));
    await user.click(screen.getByTestId('increase'));

    // Open http://localhost:3336 to see preview
    // Require to run `jest-preview` server before
    preview.debug();

    expect(screen.getByTestId('count')).toContainHTML('6');
  });
});
```
