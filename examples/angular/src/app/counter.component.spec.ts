import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import preview from "jest-preview";

import { CounterComponent } from "./counter.component";

const leftClick = { button: 0 };

describe(CounterComponent.name, () => {
  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    fixture.autoDetectChanges();
  });

  let fixture: ComponentFixture<CounterComponent>;

  it("should work as expected", () => {
    const button = fixture.debugElement.query(
      By.css('[data-testid="increase"]')
    );

    button.triggerEventHandler("click", leftClick);
    button.triggerEventHandler("click", leftClick);
    button.triggerEventHandler("click", leftClick);
    button.triggerEventHandler("click", leftClick);
    button.triggerEventHandler("click", leftClick);
    button.triggerEventHandler("click", leftClick);
    fixture.detectChanges();

    // Open http://localhost:3336 to see preview
    // Require to run `jest-preview` server before
    preview.debug();

    const count = fixture.debugElement.query(By.css('[data-testid="count"]'))
      .nativeElement as HTMLElement;
    expect(count.textContent).toBe("6");
  });
});
