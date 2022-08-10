import { Component } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CounterComponent],
  styleUrls: ['../styles/css/app.css', '../styles/scss/style.scss'],
  template: `
    <style>
      .App {
        text-align: center;
      }

      .App-logo {
        height: 40vmin;
        pointer-events: none;
      }

      @media (prefers-reduced-motion: no-preference) {
        .App-logo {
          animation: App-logo-spin infinite 20s linear;
        }
      }

      .App-header {
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
      }

      .App-link {
        color: #61dafb;
      }

      @keyframes App-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    </style>

    <div class="App">
      <header class="App-header">
        <img src="/assets/logo.svg" class="App-logo" alt="logo" />
        <img [src]="logo2" class="logo2" alt="logo2" />
        <p>Angular CLI Example</p>
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
