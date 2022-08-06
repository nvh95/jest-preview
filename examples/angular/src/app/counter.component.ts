import { Component } from "@angular/core";

@Component({
  selector: "app-counter",
  standalone: true,
  template: `
    <button data-testid="increase" type="button" (click)="onClick()">
      count is:
      <div data-testid="count">{{ count }}</div>
    </button>
  `,
  styles: [],
})
export class CounterComponent {
  count = 0;

  onClick(): void {
    this.count += 1;
  }
}
