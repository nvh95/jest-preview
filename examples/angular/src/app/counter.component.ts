import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  styles: [
    `
      button {
        font-size: calc(10px + 2vmin);
      }
    `,
  ],
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
