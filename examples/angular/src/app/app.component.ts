import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

export const styleUrls = [
  '../styles/css/app.css',
  '../styles/scss/style.scss',
  './app.component.css',
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent],
  styleUrls: [...styleUrls],
  template: `
    <div class="App">
      <header class="App-header">
        <img src="/assets/logo.svg" class="App-logo" alt="logo" />
        <img [src]="logo2" class="logo2" alt="logo2" />
        <p>
          <a
            href="https://github.com/nvh95/jest-preview/tree/main/examples/angular"
            target="_blank"
            rel="noopener noreferrer"
            >Angular CLI Example</a
          >
        </p>
        <p class="global-configured-sass">
          This text is styled by global configured SASS
        </p>
        <p class="imported-sass">This text is styled by imported SASS</p>
        <p>
          <app-counter></app-counter>
        </p>
        <p>Edit <code>app.component.ts</code> and save to test HMR updates.</p>
        <p>
          <a
            class="App-link"
            href="https://angular.io/start"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Angular
          </a>
          |
          <a
            class="App-link"
            href="https://angular.io/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Angular docs
          </a>
        </p>
      </header>
    </div>
  `,
})
export class AppComponent {
  logo2 = '/assets/images/logo.svg';
}
