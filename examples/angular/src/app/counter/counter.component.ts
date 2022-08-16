import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  styleUrls: ['./counter.component.css'],
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
